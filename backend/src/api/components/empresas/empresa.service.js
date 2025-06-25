import { Juridico } from '../../../models/index.js';

// --- Lógica de Validação (agora dentro do service para evitar problemas de import) ---
function validateCNPJ(cnpj) {
  if (typeof cnpj !== 'string') return false;
  const cnpjLimpo = cnpj.replace(/\D/g, '');
  if (cnpjLimpo.length !== 14 || /^(\d)\1{13}$/.test(cnpjLimpo)) return false;
  let tamanho = 12, soma = 0, pos = 5;
  for (let i = 0; i < tamanho; i++) {
    soma += parseInt(cnpjLimpo.charAt(i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(cnpjLimpo.charAt(12))) return false;
  tamanho = 13;
  soma = 0;
  pos = 6;
  for (let i = 0; i < tamanho; i++) {
    soma += parseInt(cnpjLimpo.charAt(i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(cnpjLimpo.charAt(13))) return false;
  return true;
}

// --- Função para criar uma nova empresa ---
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

    // Validação de entrada
    if (!validateCNPJ(cnpjJuridico)) {
        throw { name: 'ValidationError', message: 'CNPJ inválido ou não fornecido.' };
    }
    if (!razaoSocial) {
        throw { name: 'ValidationError', message: 'Razão Social é obrigatória.' };
    }
    if (!nomeComercial) {
        throw { name: 'ValidationError', message: 'Nome Comercial é obrigatório.' };
    }
    // Adicione aqui as outras validações...

    const cnpjLimpo = cnpjJuridico.replace(/\D/g, '');

    // Verificar duplicidade
    const existingCnpj = await Juridico.findByPk(cnpjLimpo);
    if (existingCnpj) {
        throw { name: 'ConflictError', message: 'Este CNPJ já está cadastrado.' };
    }
    const existingNome = await Juridico.findOne({ where: { nomeComercial } });
    if (existingNome) {
        throw { name: 'ConflictError', message: 'Este Nome Comercial já está em uso.' };
    }
    
    // Inserir no banco de dados
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

// --- Função para buscar todas as empresas ---
async function findAllEmpresas() {
    try {
        return await Juridico.findAll();
    } catch (error) {
        console.error("Erro no serviço ao buscar todas as empresas:", error);
        throw new Error("Erro ao buscar dados das empresas.");
    }
}

// --- Função para buscar uma empresa pela Chave Primária (CNPJ) ---
async function findEmpresaByPk(cnpj) {
    try {
        const cnpjLimpo = cnpj.replace(/\D/g, '');
        return await Juridico.findByPk(cnpjLimpo);
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