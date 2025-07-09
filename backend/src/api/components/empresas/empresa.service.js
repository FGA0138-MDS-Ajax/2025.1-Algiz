// Import the models correctly
import models from '../../../models/index.model.js';
import db from '../../config/db.js';
const { Empresa, Fisico, FisicoSegueJuridico } = models;
import { isValidDocument } from '../../utils/validation.util.js';

// ✅ ADICIONAR: Import direto do Sequelize para acessar Op
import { Op } from 'sequelize';  // ✅ NOVA LINHA

// ✅ ADICIONAR: Constantes para imagens padrão (mesmas do usuário)
const DEFAULT_FOTO_EMPRESA = "https://res.cloudinary.com/dupalmuyo/image/upload/v1751246125/foto-perfil-padrao-usuario-2_f0ghzz.png";
const DEFAULT_BANNER_EMPRESA = "https://res.cloudinary.com/dupalmuyo/image/upload/v1751246166/banner-padrao-1_lbhrjv.png";

// --- Service Functions ---
async function createEmpresa(idUsuario, dadosEmpresa) {
    const { cnpjJuridico, razaoSocial, nomeComercial, fotoEmpresa, bannerEmpresa, cargo = 'Administrador', ...outrosDados } = dadosEmpresa;

    // Input validations
    if (!isValidDocument(cnpjJuridico)) {
        throw { name: 'ValidationError', message: 'CNPJ inválido ou não fornecido.' };
    }
    if (!razaoSocial || !nomeComercial) {
        throw { name: 'ValidationError', message: 'Razão Social e Nome Comercial são obrigatórios.' };
    }

    const cnpjLimpo = cnpjJuridico.replace(/\D/g, '');

    // Check for duplicates
    const existingCnpj = await Empresa.findOne({ where: { cnpjJuridico: cnpjLimpo } });
    if (existingCnpj) {
        throw { name: 'ConflictError', message: 'Este CNPJ já está cadastrado.' };
    }
    const existingNome = await Empresa.findOne({ where: { nomeComercial } });
    if (existingNome) {
        throw { name: 'ConflictError', message: 'Este Nome Comercial já está em uso.' };
    }

    // ✅ BUSCAR CPF do usuário para criar o vínculo
    const [userFisico] = await db.query(
        'SELECT cpfFisico FROM FISICO WHERE idUsuario = ?',
        [idUsuario]
    );

    if (!userFisico || userFisico.length === 0) {
        throw { name: 'ValidationError', message: 'Usuário físico não encontrado.' };
    }

    const cpfUsuario = userFisico[0].cpfFisico;

    // ✅ INICIAR TRANSAÇÃO
    const transaction = await db.getConnection();
    await transaction.beginTransaction();

    try {
        // 1. Criar a empresa com imagens padrão
        const novaEmpresa = await Empresa.create({ 
            cnpjJuridico: cnpjLimpo, 
            razaoSocial, 
            nomeComercial, 
            fotoEmpresa: fotoEmpresa || DEFAULT_FOTO_EMPRESA,     // ✅ USAR PADRÃO
            bannerEmpresa: bannerEmpresa || DEFAULT_BANNER_EMPRESA, // ✅ USAR PADRÃO
            ...outrosDados, 
            idUsuario 
        });

        // 2. ✅ Criar vínculo automático na VINCULO_JURIDICO_FISICO
        await db.query(
            'INSERT INTO VINCULO_JURIDICO_FISICO (cpfFisico, idEmpresa, cargo) VALUES (?, ?, ?)',
            [cpfUsuario, novaEmpresa.idEmpresa, cargo]
        );

        // ✅ COMMIT
        await transaction.commit();
        transaction.release();

        console.log(`✅ Empresa criada e vínculo estabelecido: Empresa ${novaEmpresa.idEmpresa} <-> Usuário ${cpfUsuario} (${cargo})`);

        return novaEmpresa;

    } catch (error) {
        // ✅ ROLLBACK
        await transaction.rollback();
        transaction.release();
        
        console.error('❌ Erro ao criar empresa e vínculo:', error);
        throw error;
    }
}

async function findAllEmpresas() {
    return Empresa.findAll();
}

// ✅ RENOMEAR: findEmpresaByPk → findEmpresaByCnpj (para clareza)
async function findEmpresaByCnpj(cnpj) {
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    return Empresa.findOne({ where: { cnpjJuridico: cnpjLimpo } });
}

// ✅ MANTER: Busca por ID (principal)
async function findEmpresaById(id) {
    return Empresa.findByPk(id);
}

// ✅ ADICIONAR: Alias para compatibilidade (se necessário)
async function findEmpresaByPk(cnpj) {
    return findEmpresaByCnpj(cnpj);
}

// Função para atualização
async function updateEmpresa(id, idUsuario, dadosUpdate) {
    const empresa = await Empresa.findByPk(id);

    if (!empresa) {
        throw { name: 'NotFoundError', message: 'Empresa não encontrada.' };
    }
    if (empresa.idUsuario !== idUsuario) {
        throw { name: 'AuthorizationError', message: 'Você não tem permissão para editar esta empresa.' };
    }
    
    // Verificar conflito de nome comercial
    if (dadosUpdate.nomeComercial) {
        const existingNome = await Empresa.findOne({ 
            where: { 
                nomeComercial: dadosUpdate.nomeComercial,
                idEmpresa: { [Op.ne]: id }        // ✅ CORRIGIR: usar Op do import direto
            } 
        });
        if (existingNome) {
            throw { name: 'ConflictError', message: 'Nome Comercial já está em uso por outra empresa.' };
        }
    }

    await empresa.update(dadosUpdate);
    return empresa;
}

// ✅ Método para buscar empresa do usuário logado
async function findEmpresaByUserId(idUsuario) {
    return Empresa.findOne({ where: { idUsuario } });
}

// ✅ Método para buscar postagens da empresa
async function getEmpresaPostagens(idEmpresa, options = {}) {
    const empresa = await Empresa.findByPk(idEmpresa, {
        include: [
            {
                model: models.Post,
                as: 'postagens',
                include: [
                    { model: models.Tag, as: 'tags' }
                ],
                order: [['criado_em', 'DESC']],
                limit: options.limit || 10,
                offset: options.offset || 0
            }
        ]
    });
    
    if (!empresa) {
        throw { name: 'NotFoundError', message: 'Empresa não encontrada.' };
    }
    
    return empresa;
}

// ✅ NOVA FUNÇÃO: Definir foto padrão da empresa
async function setEmpresaDefaultPhoto(idEmpresa, idUsuario) {
    const empresa = await Empresa.findByPk(idEmpresa);

    if (!empresa) {
        throw { name: 'NotFoundError', message: 'Empresa não encontrada.' };
    }
    if (empresa.idUsuario !== idUsuario) {
        throw { name: 'AuthorizationError', message: 'Você não tem permissão para editar esta empresa.' };
    }

    await empresa.update({ fotoEmpresa: DEFAULT_FOTO_EMPRESA });
    return { message: "Foto da empresa restaurada para padrão.", fotoEmpresa: DEFAULT_FOTO_EMPRESA };
}

// ✅ NOVA FUNÇÃO: Definir banner padrão da empresa
async function setEmpresaDefaultBanner(idEmpresa, idUsuario) {
    const empresa = await Empresa.findByPk(idEmpresa);

    if (!empresa) {
        throw { name: 'NotFoundError', message: 'Empresa não encontrada.' };
    }
    if (empresa.idUsuario !== idUsuario) {
        throw { name: 'AuthorizationError', message: 'Você não tem permissão para editar esta empresa.' };
    }

    await empresa.update({ bannerEmpresa: DEFAULT_BANNER_EMPRESA });
    return { message: "Banner da empresa restaurado para padrão.", bannerEmpresa: DEFAULT_BANNER_EMPRESA };
}

// Corrigindo a função getUsuariosVinculados - removendo referência à coluna status inexistente

async function getUsuariosVinculados(idEmpresa) {
    try {
        // Consulta SQL para buscar usuários vinculados e seus detalhes
        const [usuariosVinculados] = await db.query(`
            SELECT u.idUsuario AS id, f.nomeFisico AS nomeCompleto, v.cargo, 
                   v.dataVinculo AS dataVinculo, u.fotoPerfil,
                   'Ativo' AS status  -- Definindo todos como Ativos já que estão vinculados
            FROM VINCULO_JURIDICO_FISICO v
            JOIN FISICO f ON v.cpfFisico = f.cpfFisico
            JOIN USUARIO u ON f.idUsuario = u.idUsuario
            WHERE v.idEmpresa = ?
            ORDER BY v.dataVinculo DESC
        `, [idEmpresa]);
        
        return usuariosVinculados;
    } catch (error) {
        console.error("Erro ao buscar usuários vinculados:", error);
        throw error;
    }
}

// Seguir uma empresa
async function followEmpresa(idEmpresa, cpfFisico) {
    try {
        // Verificar se a empresa existe
        const empresa = await Empresa.findByPk(idEmpresa);
        if (!empresa) {
            throw { name: 'NotFoundError', message: 'Empresa não encontrada.' };
        }
        
        // Verificar se já segue
        const existingFollow = await models.FisicoSegueJuridico.findOne({
            where: {
                cpfFisico,
                idEmpresa
            }
        });
        
        if (existingFollow) {
            return { message: 'Você já segue esta empresa.', already: true };
        }
        
        // Adicionar o relacionamento
        await models.FisicoSegueJuridico.create({
            cpfFisico,
            idEmpresa,
            dtInicio: new Date()
        });
        
        return { message: 'Empresa seguida com sucesso!' };
    } catch (error) {
        console.error('Erro ao seguir empresa:', error);
        throw error;
    }
}

// Deixar de seguir uma empresa
async function unfollowEmpresa(idEmpresa, cpfFisico) {
    try {
        // Verificar se a empresa existe
        const empresa = await Empresa.findByPk(idEmpresa);
        if (!empresa) {
            throw { name: 'NotFoundError', message: 'Empresa não encontrada.' };
        }
        
        // Remover o relacionamento
        const result = await models.FisicoSegueJuridico.destroy({
            where: {
                cpfFisico,
                idEmpresa
            }
        });
        
        if (result === 0) {
            return { message: 'Você não segue esta empresa.', notFollowing: true };
        }
        
        return { message: 'Você deixou de seguir esta empresa.' };
    } catch (error) {
        console.error('Erro ao deixar de seguir empresa:', error);
        throw error;
    }
}

// Verificar se usuário segue empresa
async function checkIfUserFollowsEmpresa(idEmpresa, cpfFisico) {
    try {
        const follow = await models.FisicoSegueJuridico.findOne({
            where: {
                cpfFisico,
                idEmpresa
            }
        });
        
        return { follows: !!follow };
    } catch (error) {
        console.error('Erro ao verificar se usuário segue empresa:', error);
        throw error;
    }
}

// Obter seguidores de uma empresa
async function getEmpresaFollowers(idEmpresa, limit = 10, offset = 0) {
    try {
        const followers = await models.FisicoSegueJuridico.findAndCountAll({
            where: { idEmpresa },
            include: [{
                model: models.Fisico,
                include: [{
                    model: models.Usuario,
                    attributes: ['idUsuario', 'fotoPerfil']
                }]
            }],
            order: [['dtInicio', 'DESC']],
            limit,
            offset
        });
        
        return { 
            followers: followers.rows.map(f => ({
                id: f.Fisico.Usuario.idUsuario,
                nome: f.Fisico.nomeFisico,
                sobrenome: f.Fisico.sobrenomeFisico,
                fotoPerfil: f.Fisico.Usuario.fotoPerfil,
                dataInicio: f.dtInicio
            })),
            total: followers.count
        };
    } catch (error) {
        console.error('Erro ao buscar seguidores da empresa:', error);
        throw error;
    }
}

// ✅ EXPORT atualizado
export default {
    createEmpresa,
    findAllEmpresas,
    findEmpresaByPk,
    findEmpresaByCnpj,
    findEmpresaById,
    findEmpresaByUserId,
    updateEmpresa,
    getEmpresaPostagens,
    setEmpresaDefaultPhoto,    // ✅ NOVA
    setEmpresaDefaultBanner,    // ✅ NOVA
    getUsuariosVinculados,   // Nova função adicionada aqui
    followEmpresa,
    unfollowEmpresa,
    checkIfUserFollowsEmpresa,
    getEmpresaFollowers
};