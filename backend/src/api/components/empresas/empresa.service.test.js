import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';

// --- Início da Configuração dos Testes ---

// Declaramos as variáveis que irão conter os nossos módulos (o serviço e os mocks)
let empresaService;
let Juridico;
let isValidDocument;

// O describe agrupa todos os nossos testes.
describe('Empresa Service', () => {

  // beforeEach é executado ANTES de cada teste. É o local perfeito para configurar os mocks.
  beforeEach(async () => {
    // MOCK DOS MÓDULOS: Usamos jest.unstable_mockModule, a forma moderna e segura.
    const modelsMock = {
      Juridico: {
        findByPk: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
      },
    };
    jest.unstable_mockModule('../../../models/index.model.js', () => ({
      __esModule: true,
      default: modelsMock,
    }));

    const validationMock = {
      isValidDocument: jest.fn(),
    };
    jest.unstable_mockModule('../../utils/validation.util.js', () => ({
      __esModule: true,
      ...validationMock,
    }));

    // IMPORT DINÂMICO: Importamos os módulos APÓS os mocks serem definidos.
    empresaService = (await import('./empresa.service.js')).default;
    Juridico = (await import('../../../models/index.model.js')).default.Juridico;
    isValidDocument = (await import('../../utils/validation.util.js')).isValidDocument;
  });

  // afterEach limpa os mocks para garantir que os testes não interferem uns com os outros.
  afterEach(() => {
    jest.clearAllMocks();
  });


  // --- Início dos Casos de Teste ---

  describe('createEmpresa', () => {
    const idUsuario = 1;
    const dadosEmpresa = {
      cnpjJuridico: '11.444.777/0001-61',
      razaoSocial: 'Empresa Teste LTDA',
      nomeComercial: 'Nome Fantasia Teste',
    };

    it('deve criar e retornar uma nova empresa com sucesso', async () => {
      isValidDocument.mockReturnValue(true);
      Juridico.findByPk.mockResolvedValue(null);
      Juridico.findOne.mockResolvedValue(null);
      const empresaCriada = { ...dadosEmpresa, idUsuario };
      Juridico.create.mockResolvedValue(empresaCriada);

      await expect(empresaService.createEmpresa(idUsuario, dadosEmpresa)).resolves.toEqual(empresaCriada);
    });
    
    // NOVO TESTE para cobrir a validação de campos obrigatórios
    it('deve lançar um erro de validação se a razaoSocial ou nomeComercial não forem fornecidos', async () => {
      isValidDocument.mockReturnValue(true);
      const dadosIncompletos = { ...dadosEmpresa, razaoSocial: '' }; // Simula a falta de razaoSocial
      
      await expect(empresaService.createEmpresa(idUsuario, dadosIncompletos)).rejects.toMatchObject({
        name: 'ValidationError',
        message: 'Razão Social e Nome Comercial são obrigatórios.',
      });
    });

    it('deve lançar um erro de validação se o CNPJ for inválido', async () => {
      isValidDocument.mockReturnValue(false);
      await expect(empresaService.createEmpresa(idUsuario, dadosEmpresa)).rejects.toMatchObject({
        name: 'ValidationError',
      });
    });

    it('deve lançar um erro de conflito se o CNPJ já existir', async () => {
      isValidDocument.mockReturnValue(true);
      Juridico.findByPk.mockResolvedValue({ ...dadosEmpresa });
      await expect(empresaService.createEmpresa(idUsuario, dadosEmpresa)).rejects.toMatchObject({
        name: 'ConflictError',
      });
    });

    // NOVO TESTE para cobrir a verificação de nome comercial duplicado
    it('deve lançar um erro de conflito se o Nome Comercial já existir', async () => {
      isValidDocument.mockReturnValue(true);
      Juridico.findByPk.mockResolvedValue(null);
      Juridico.findOne.mockResolvedValue({ ...dadosEmpresa });
      await expect(empresaService.createEmpresa(idUsuario, dadosEmpresa)).rejects.toMatchObject({
        name: 'ConflictError',
      });
    });
  });

  describe('findAllEmpresas', () => {
    it('deve retornar um array de empresas', async () => {
      const listaDeEmpresas = [{ nomeComercial: 'Empresa 1' }];
      Juridico.findAll.mockResolvedValue(listaDeEmpresas);
      await expect(empresaService.findAllEmpresas()).resolves.toEqual(listaDeEmpresas);
    });
  });

  describe('findEmpresaByPk', () => {
    it('deve retornar uma empresa quando o CNPJ existe', async () => {
      const empresaEncontrada = { nomeComercial: 'Empresa Encontrada' };
      Juridico.findByPk.mockResolvedValue(empresaEncontrada);
      await expect(empresaService.findEmpresaByPk('11444777000161')).resolves.toEqual(empresaEncontrada);
    });

    it('deve retornar null quando o CNPJ não existe', async () => {
      Juridico.findByPk.mockResolvedValue(null);
      await expect(empresaService.findEmpresaByPk('00000000000000')).resolves.toBeNull();
    });
  });

  describe('updateEmpresa', () => {
    const cnpj = '11.444.777/0001-61';
    const idUsuario = 1;
    const dadosUpdate = { razaoSocial: 'Empresa Atualizada LTDA' };
    const mockEmpresaInstance = { idUsuario, update: jest.fn() };

    it('deve atualizar a empresa com sucesso', async () => {
      mockEmpresaInstance.idUsuario = idUsuario;
      Juridico.findByPk.mockResolvedValue(mockEmpresaInstance);
      await expect(empresaService.updateEmpresa(cnpj, idUsuario, dadosUpdate)).resolves.toBe(mockEmpresaInstance);
      expect(mockEmpresaInstance.update).toHaveBeenCalledWith(dadosUpdate);
    });

    // NOVO TESTE para cobrir a verificação de conflito na atualização
    it('deve lançar um erro de conflito ao tentar atualizar para um nome comercial que já existe em outra empresa', async () => {
        mockEmpresaInstance.idUsuario = idUsuario;
        Juridico.findByPk.mockResolvedValue(mockEmpresaInstance);

        const dadosUpdateComConflito = { nomeComercial: 'Nome Existente' };
        // Simula que encontrou outra empresa com este nome (com CNPJ diferente)
        Juridico.findOne.mockResolvedValue({ cnpjJuridico: '99999999000199' });

        await expect(empresaService.updateEmpresa(cnpj, idUsuario, dadosUpdateComConflito)).rejects.toMatchObject({
            name: 'ConflictError',
            message: 'Nome Comercial já está em uso por outra empresa.'
        });
    });

    it('deve lançar um erro "Not Found" se a empresa não existir', async () => {
      Juridico.findByPk.mockResolvedValue(null);
      await expect(empresaService.updateEmpresa(cnpj, idUsuario, dadosUpdate)).rejects.toMatchObject({
        name: 'NotFoundError',
      });
    });

    it('deve lançar um erro de autorização se o usuário não for o dono da empresa', async () => {
      mockEmpresaInstance.idUsuario = 2; // Usuário diferente
      Juridico.findByPk.mockResolvedValue(mockEmpresaInstance);
      await expect(empresaService.updateEmpresa(cnpj, idUsuario, dadosUpdate)).rejects.toMatchObject({
        name: 'AuthorizationError',
      });
    });
  });
});
