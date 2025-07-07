// Import the models correctly
import models from '../../../models/index.model.js';
const { Empresa } = models;
import { isValidDocument } from '../../utils/validation.util.js';

// --- Service Functions ---
async function createEmpresa(idUsuario, dadosEmpresa) {
    const { cnpjJuridico, razaoSocial, nomeComercial, ...outrosDados } = dadosEmpresa;

    // Input validations
    if (!isValidDocument(cnpjJuridico)) {
        throw { name: 'ValidationError', message: 'CNPJ inválido ou não fornecido.' };
    }
    if (!razaoSocial || !nomeComercial) {
        throw { name: 'ValidationError', message: 'Razão Social e Nome Comercial são obrigatórios.' };
    }

    const cnpjLimpo = cnpjJuridico.replace(/\D/g, '');

    // Check for duplicates
    const existingCnpj = await Empresa.findByPk(cnpjLimpo);
    if (existingCnpj) {
        throw { name: 'ConflictError', message: 'Este CNPJ já está cadastrado.' };
    }
    const existingNome = await Empresa.findOne({ where: { nomeComercial } });
    if (existingNome) {
        throw { name: 'ConflictError', message: 'Este Nome Comercial já está em uso.' };
    }
    
    // Create the company in the database
    return Empresa.create({ 
        cnpjJuridico: cnpjLimpo, 
        razaoSocial, 
        nomeComercial, 
        ...outrosDados, 
        idUsuario 
    });
}

async function findAllEmpresas() {
    return Empresa.findAll();
}

async function findEmpresaByPk(cnpj) {
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    return Empresa.findByPk(cnpjLimpo);
}

// Função para atualização
async function updateEmpresa(cnpj, idUsuario, dadosUpdate) {
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    const empresa = await Empresa.findByPk(cnpjLimpo);

    if (!empresa) {
        throw { name: 'NotFoundError', message: 'Empresa não encontrada.' };
    }
    if (empresa.idUsuario !== idUsuario) {
        throw { name: 'AuthorizationError', message: 'Você não tem permissão para editar esta empresa.' };
    }
    // Verifica se o nome comercial está a ser atualizado para um que já existe noutra empresa
    if (dadosUpdate.nomeComercial) {
        const existingNome = await Empresa.findOne({ where: { nomeComercial: dadosUpdate.nomeComercial } });
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