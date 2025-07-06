import models from "../../../models/index.model.js";
const { Empresa } = models;
const { Juridico } = models;
import { isValidDocument } from '../../utils/validation.util.js';

function formatarCNPJ(cnpj) {
    // Remove tudo que não for número
    const numerosCnpj = cnpj.replace(/\D/g, '');
    
    // Aplica a formatação XX.XXX.XXX/XXXX-XX
    return numerosCnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

function validateCNPJ(cnpj) {
    // Validação básica de CNPJ
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    return cnpjLimpo.length === 14;
}

async function createEmpresa(idUsuario, dadosEmpresa) {
    console.log("Recebido no backend:", dadosEmpresa);
    const {
        cnpjJuridico,
        razaoSocial,
        nomeComercial,
        telefoneJuridico,
        estadoJuridico,
        enderecoJuridico,
        areaAtuacao
    } = dadosEmpresa;

    if (!isValidDocument(cnpjJuridico)) {
        const error = new Error('CNPJ inválido ou não fornecido.');
        error.name = 'ValidationError';
        throw error;
    }

    // Validação de entrada
    if (!validateCNPJ(cnpjJuridico)) {
        const error = new Error('CNPJ inválido ou não fornecido.');
        error.name = 'ValidationError';
        throw error;
    }
    if (!razaoSocial) {
        const error = new Error('Razão Social é obrigatória.');
        error.name = 'ValidationError';
        throw error;
    }
    if (!nomeComercial) {
        const error = new Error('Nome Comercial é obrigatório.');
        error.name = 'ValidationError';
        throw error;
    }
    // Adicione aqui as outras validações...

    const cnpjLimpo = cnpjJuridico.replace(/\D/g, '');

    // Verificar duplicidade
    const existingCnpj = await Juridico.findByPk(cnpjLimpo);
    if (existingCnpj) {
        const error = new Error('Este CNPJ já está cadastrado.');
        error.name = 'ConflictError';
        throw error;
    }
    const existingNome = await Empresa.findOne({ where: { nomeComercial } });
    if (existingNome) {
        const error = new Error('Este Nome Comercial já está em uso.');
        error.name = 'ConflictError';
        throw error;
    }
    
    // Inserir no banco de dados
    try {
        const novaEmpresa = await Empresa.create({
            cnpjJuridico: cnpjLimpo,
            razaoSocial,
            nomeComercial,
            telefoneJuridico,
            estadoJuridico,
            enderecoJuridico,
            areaAtuacao,
            idUsuario
        });
        return novaEmpresa;
    } catch (dbError) {
        console.error("Erro de banco de dados ao inserir empresa:", dbError);
        throw new Error("Não foi possível salvar a empresa no banco de dados.");
    }
}

// --- Função para buscar todas as empresas ---
async function findAllEmpresas() {
    try {
        return await Empresa.findAll();
    } catch (error) {
        console.error("Erro no serviço ao buscar todas as empresas:", error);
        throw new Error("Erro ao buscar dados das empresas.");
    }
}

// --- Função para buscar uma empresa pela Chave Primária (CNPJ) ---
async function findEmpresaByPk(cnpj) {
    try {
        // ✅ CORREÇÃO: Recebe CNPJ já formatado do controller
        return await Empresa.findByPk(cnpj);
    } catch (error) {
        console.error(`Erro no serviço ao buscar empresa pelo CNPJ ${cnpj}:`, error);
        throw new Error("Erro ao buscar dados da empresa.");
    }
}

// --- ✅ FUNÇÃO ATUALIZADA: Atualizar dados da empresa ---
async function updateEmpresa(cnpjFormatado, idUsuario, dadosEmpresa) {
    try {
        // ✅ CORREÇÃO: Recebe CNPJ já formatado do controller
        const cnpjLimpo = cnpjFormatado.replace(/\D/g, '');
        
        // Buscar a empresa existente usando CNPJ formatado
        const empresaExistente = await Empresa.findByPk(cnpjFormatado);
        if (!empresaExistente) {
            const error = new Error('Empresa não encontrada.');
            error.name = 'NotFoundError';
            throw error;
        }

        // Verificar se o usuário é o dono da empresa
        if (empresaExistente.idUsuario !== idUsuario) {
            const error = new Error('Você não tem permissão para editar esta empresa.');
            error.name = 'UnauthorizedError';
            throw error;
        }

        // Validar dados de entrada
        const {
            razaoSocial,
            nomeComercial,
            telefoneJuridico,
            estadoJuridico,
            enderecoJuridico,
            areaAtuacao
        } = dadosEmpresa;

        if (!razaoSocial) {
            const error = new Error('Razão Social é obrigatória.');
            error.name = 'ValidationError';
            throw error;
        }
        if (!nomeComercial) {
            const error = new Error('Nome Comercial é obrigatório.');
            error.name = 'ValidationError';
            throw error;
        }
        if (!telefoneJuridico) {
            const error = new Error('Telefone é obrigatório.');
            error.name = 'ValidationError';
            throw error;
        }
        if (!estadoJuridico) {
            const error = new Error('Estado é obrigatório.');
            error.name = 'ValidationError';
            throw error;
        }
        if (!enderecoJuridico) {
            const error = new Error('Endereço é obrigatório.');
            error.name = 'ValidationError';
            throw error;
        }

        // Verificar se o nome comercial já existe (exceto para a própria empresa)
        if (nomeComercial !== empresaExistente.nomeComercial) {
            const { Op } = await import('sequelize');
            const existingNome = await Empresa.findOne({ 
                where: { 
                    nomeComercial,
                    cnpjJuridico: { [Op.ne]: cnpjFormatado }
                }
            });
            if (existingNome) {
                const error = new Error('Este Nome Comercial já está em uso por outra empresa.');
                error.name = 'ConflictError';
                throw error;
            }
        }

        // Atualizar os dados da empresa
        const empresaAtualizada = await empresaExistente.update({
            razaoSocial,
            nomeComercial,
            telefoneJuridico,
            estadoJuridico,
            enderecoJuridico,
            areaAtuacao: areaAtuacao || empresaExistente.areaAtuacao
        });

        return empresaAtualizada;
    } catch (error) {
        console.error(`Erro no serviço ao atualizar empresa ${cnpjFormatado}:`, error);
        
        // Re-throw de erros conhecidos
        if (error.name === 'ValidationError' || 
            error.name === 'ConflictError' || 
            error.name === 'NotFoundError' || 
            error.name === 'UnauthorizedError') {
            throw error;
        }
        
        // Erro genérico
        throw new Error("Erro ao atualizar dados da empresa.");
    }
}

// Exporta um objeto com todas as funções do serviço.
export default {
    createEmpresa,
    findAllEmpresas,
    findEmpresaByPk,
    updateEmpresa
};