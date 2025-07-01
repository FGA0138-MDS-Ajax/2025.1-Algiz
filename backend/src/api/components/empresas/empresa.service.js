import models from "../../../models/index.model.js";
const { Empresa } = models;
import { isValidDocument } from '../../utils/validation.util.js';


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
        throw { name: 'ValidationError', message: 'CNPJ inválido ou não fornecido.' };
    }
    if (!razaoSocial) {
        throw { name: 'ValidationError', message: 'Razão Social é obrigatória.' };
    }
    if (!nomeComercial) {
        throw { name: 'ValidationError', message: 'Nome Comercial é obrigatório.' };
    }


    const cnpjLimpo = cnpjJuridico.replace(/\D/g, '');


    const existingCnpj = await Empresa.findByPk(cnpjLimpo);
    if (existingCnpj) {
        throw { name: 'ConflictError', message: 'Este CNPJ já está cadastrado.' };
    }
    const existingNome = await Empresa.findOne({ where: { nomeComercial } });
    if (existingNome) {
        throw { name: 'ConflictError', message: 'Este Nome Comercial já está em uso.' };
    }


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


async function findAllEmpresas() {
    try {
        return await Empresa.findAll();
    } catch (error) {
        console.error("Erro no serviço ao buscar todas as empresas:", error);
        throw new Error("Erro ao buscar dados das empresas.");
    }
}


async function findEmpresaByPk(cnpj) {
    try {
        const cnpjLimpo = cnpj.replace(/\D/g, '');
        return await Empresa.findByPk(cnpjLimpo);
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