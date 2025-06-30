import { Juridico } from '../../../models/index.js';
import { isValidDocument } from '../../utils/validation.util.js';

async function createEmpresa(idUsuario, dadosEmpresa) {
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

    const cnpjLimpo = cnpjJuridico.replace(/\D/g, '');

    const existingCnpj = await Juridico.findByPk(cnpjLimpo);
    if (existingCnpj) {
        const error = new Error('Este CNPJ já está cadastrado.');
        error.name = 'ConflictError';
        throw error;
    }
    const existingNome = await Juridico.findOne({ where: { nomeComercial } });
    if (existingNome) {
        const error = new Error('Este Nome Comercial já está em uso.');
        error.name = 'ConflictError';
        throw error;
    }
    try {
        const novaEmpresa = await Juridico.create({
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
async function findAllEmpresas() {
    try {
        return await Juridico.findAll();
    } catch (error) {
        console.error("Erro no serviço ao buscar todas as empresas:", error);
        throw new Error("Erro ao buscar dados das empresas.");
    }
}
async function findEmpresaByPk(cnpj) {
    try {
        const cnpjLimpo = cnpj.replace(/\D/g, '');
        return await Juridico.findByPk(cnpjLimpo);
    } catch (error) {
        console.error(`Erro no serviço ao buscar empresa pelo CNPJ ${cnpj}:`, error);
        throw new Error("Erro ao buscar dados da empresa.");
    }
}
export default {
    createEmpresa,
    findAllEmpresas,
    findEmpresaByPk
};