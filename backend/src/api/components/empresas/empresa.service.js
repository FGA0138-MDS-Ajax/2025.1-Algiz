// Importa o objeto 'db' padrão e depois desestrutura o modelo 'Juridico'.
import db from '../../../models/index.model.js';
const { Juridico } = db;
import { isValidDocument } from '../../utils/validation.util.js';

// --- Funções do Serviço ---
async function createEmpresa(idUsuario, dadosEmpresa) {
    const { cnpjJuridico, razaoSocial, nomeComercial, ...outrosDados } = dadosEmpresa;

    // Validações de entrada
    if (!isValidDocument(cnpjJuridico)) {
        throw { name: 'ValidationError', message: 'CNPJ inválido ou não fornecido.' };
    }
    if (!razaoSocial || !nomeComercial) {
        throw { name: 'ValidationError', message: 'Razão Social e Nome Comercial são obrigatórios.' };
    }

    const cnpjLimpo = cnpjJuridico.replace(/\D/g, '');

    // Verifica duplicidade
    const existingCnpj = await Juridico.findByPk(cnpjLimpo);
    if (existingCnpj) {
        throw { name: 'ConflictError', message: 'Este CNPJ já está cadastrado.' };
    }
    const existingNome = await Juridico.findOne({ where: { nomeComercial } });
    if (existingNome) {
        throw { name: 'ConflictError', message: 'Este Nome Comercial já está em uso.' };
    }
    
    // Cria a empresa no banco
    return Juridico.create({ cnpjJuridico: cnpjLimpo, razaoSocial, nomeComercial, ...outrosDados, idUsuario });
}

async function findAllEmpresas() {
    return Juridico.findAll();
}

async function findEmpresaByPk(cnpj) {
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    return Juridico.findByPk(cnpjLimpo);
}

// Função para atualização
async function updateEmpresa(cnpj, idUsuario, dadosUpdate) {
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    const empresa = await Juridico.findByPk(cnpjLimpo);

    if (!empresa) {
        throw { name: 'NotFoundError', message: 'Empresa não encontrada.' };
    }
    if (empresa.idUsuario !== idUsuario) {
        throw { name: 'AuthorizationError', message: 'Você não tem permissão para editar esta empresa.' };
    }
    // Verifica se o nome comercial está a ser atualizado para um que já existe noutra empresa
    if (dadosUpdate.nomeComercial) {
        const existingNome = await Juridico.findOne({ where: { nomeComercial: dadosUpdate.nomeComercial } });
        // Se encontrou uma empresa com o mesmo nome E o CNPJ é diferente do atual, lança erro
        if (existingNome && existingNome.cnpjJuridico !== cnpjLimpo) {
            throw { name: 'ConflictError', message: 'Nome Comercial já está em uso por outra empresa.' };
        }
    }

    await empresa.update(dadosUpdate);
    return empresa;
}

export default {
    createEmpresa,
    findAllEmpresas,
    findEmpresaByPk,
    updateEmpresa,
};