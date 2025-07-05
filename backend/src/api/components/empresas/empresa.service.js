import models from "../../../models/index.model.js";
const { Empresa } = models;
const { Juridico } = models;
import { isValidDocument } from '../../utils/validation.util.js';

function formatarCNPJ(cnpj) {
    // Remove tudo que não for número
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    // Aplica a máscara: 12.345.678/0001-01
    if (cnpjLimpo.length !== 14) return cnpj; // Retorna original se não for válido
    return (
        cnpjLimpo.slice(0, 2) + '.' +
        cnpjLimpo.slice(2, 5) + '.' +
        cnpjLimpo.slice(5, 8) + '/' +
        cnpjLimpo.slice(8, 12) + '-' +
        cnpjLimpo.slice(12, 14)
    );
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
        const cnpjFormatado = formatarCNPJ(cnpj);
        return await Empresa.findByPk(cnpjFormatado);
    } catch (error) {
        console.error(`Erro no serviço ao buscar empresa pelo CNPJ ${cnpj}:`, error);
        throw new Error("Erro ao buscar dados da empresa.");
    }
}

// Exporta um objeto com todas as funções do serviço.
export default {
    createEmpresa,
    findAllEmpresas,
    findEmpresaByPk
};