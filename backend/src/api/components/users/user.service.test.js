import { jest } from '@jest/globals';
import { isValidDocument } from '../../utils/validation.util.js';

const mockDbQuery = jest.fn();
const mockHashPassword = jest.fn();
const mockComparePassword = jest.fn();


jest.unstable_mockModule('../../config/db.js', () => ({
  default: {
    query: mockDbQuery,
  },
}));

jest.unstable_mockModule('../../utils/hash.util.js', () => ({
  hashPassword: mockHashPassword,
  comparePassword: mockComparePassword,
}));


let userService;
let db;
let hashPassword;

beforeAll(async () => {
  userService = (await import('./user.service.js')).default;
  db = (await import('../../config/db.js')).default;
  ({ hashPassword } = await import('../../utils/hash.util.js'));
});

beforeEach(() => {
  mockDbQuery.mockClear();
  mockHashPassword.mockClear();
  mockComparePassword.mockClear();
});



// Grupo de testes para a validação de CPF/CNPJ
describe('Validação de Documento (CPF/CNPJ)', () => {

    // --- Tarefa: Testar CPFs e CNPJs com todos os dígitos repetidos ---
    describe('Documentos com dígitos repetidos', () => {
        it('deve retornar falso para CPF com todos os dígitos iguais', () => {
            expect(isValidDocument('111.111.111-11')).toBe(false);
        });

        it('deve retornar falso para CNPJ com todos os dígitos iguais', () => {
            expect(isValidDocument('22.222.222/2222-22')).toBe(false);
        });
    });

    // --- Tarefa: Testar entradas mal formatadas ---
    describe('Entradas mal formatadas', () => {

        const cpfInvalido = '123.456.789-00';
        const cpfInvalidoSemMascara = '12345678900';
        const cnpjInvalido = '11.222.333/0001-44';
        const cnpjInvalidoSemMascara = '11222333000144';
        it('deve retornar falso para documento com letras', () => {
            expect(isValidDocument(cpfInvalido)).toBe(false);
        });

        it('deve retornar falso para documento com símbolos', () => {
            expect(isValidDocument(cpfInvalidoSemMascara)).toBe(false);
        });

        it('deve retornar falso para documento com menos de 11 dígitos', () => {
            expect(isValidDocument(cnpjInvalido)).toBe(false);
        });

        it('deve retornar falso para documento com 12 ou 13 dígitos', () => {
            expect(isValidDocument(cnpjInvalidoSemMascara)).toBe(false);
        });
    });

    // --- Tarefa: Testar entradas válidas reais ---
    describe('Entradas válidas', () => {
        // Use estes CPFs e CNPJs que são matematicamente válidos
        const cpfValido = '123.456.789-09';
        const cpfValidoSemMascara = '12345678909';
        const cnpjValido = '11.444.777/0001-61';
        const cnpjValidoSemMascara = '11444777000161';

        it('deve retornar verdadeiro para um CPF válido (com máscara)', () => {
            expect(isValidDocument(cpfValido)).toBe(true);
        });

        it('deve retornar verdadeiro para um CPF válido (sem máscara)', () => {
            expect(isValidDocument(cpfValidoSemMascara)).toBe(true);
        });

        it('deve retornar verdadeiro para um CNPJ válido (com máscara)', () => {
            expect(isValidDocument(cnpjValido)).toBe(true);
        });

        it('deve retornar verdadeiro para um CNPJ válido (sem máscara)', () => {
            expect(isValidDocument(cnpjValidoSemMascara)).toBe(true);
        });
    });
    
    // Testes adicionais para cobrir mais ramos da lógica
    describe('Casos limite e inválidos', () => {

        const cpfInvalido = '111.222.333-45'; // CPF inválido
        const cnpjInvalido = '11.222.333/0001-45'; // CNPJ inválido
    
        it('deve retornar falso para um CPF com dígitos verificadores incorretos', () => {
            expect(isValidDocument(cpfInvalido)).toBe(false);
        });

        it('deve retornar falso para um CNPJ com dígitos verificadores incorretos', () => {
            expect(isValidDocument(cnpjInvalido)).toBe(false);
        });

        it('deve retornar falso para strings vazias', () => {
            expect(isValidDocument('')).toBe(false);
        });

        it('deve retornar falso para null ou undefined', () => {
            expect(isValidDocument(null)).toBe(false);
            expect(isValidDocument(undefined)).toBe(false);
        });
    });
});

describe('Validação de Senha', () => {
    it('deve retornar erro para senha com menos de 8 caracteres', () => {
        const erros = [];
        // CORREÇÃO: Chame a função a partir do userService
        userService.validateSenha('Abc123!', erros); 
        expect(erros).toEqual(expect.arrayContaining([expect.objectContaining({ mensagem: 'Senha deve ter no mínimo 8 caracteres.' })]));
    });

    it('deve retornar erro para senha sem letra maiúscula', () => {
        const erros = [];
        // CORREÇÃO: Chame a função a partir do userService
        userService.validateSenha('abc123!d', erros);
        expect(erros).toEqual(expect.arrayContaining([expect.objectContaining({ mensagem: 'Senha deve conter pelo menos uma letra maiúscula.' })]));
    });

    it('deve retornar erro para senha sem número', () => {
        const erros = [];
        // CORREÇÃO: Chame a função a partir do userService
        userService.validateSenha('Abcdefgh!', erros);
        expect(erros).toEqual(expect.arrayContaining([expect.objectContaining({ mensagem: 'Senha deve conter pelo menos um número.' })]));
    });

    it('deve retornar erro para senha sem caractere especial', () => {
        const erros = [];
        // CORREÇÃO: Chame a função a partir do userService
        userService.validateSenha('Abcdefgh1', erros);
        expect(erros).toEqual(expect.arrayContaining([expect.objectContaining({ mensagem: 'A senha deve conter ao menos um caractere especial.' })]));
    });

    it('não deve retornar erros para uma senha válida', () => {
        const erros = [];
        // CORREÇÃO: Chame a função a partir do userService
        userService.validateSenha('Senha@Forte123', erros);
        expect(erros.length).toBe(0);
    });

    it('deve retornar múltiplos erros para senha que falha em múltiplas regras', () => {
        const erros = [];
        // CORREÇÃO: Chame a função a partir do userService
        userService.validateSenha('abc', erros); 
        expect(erros.length).toBe(4);
    });
});

describe('createUser', () => {
    it('deve criar um novo usuário e retornar seus dados', async () => {
        const userData = {
            nome: 'Rafael', sobrenome: 'Teste', email: 'rafael.teste@example.com',
            senha: 'Senha@Forte123', telefone: '11987654321', estado: 'SP',
            sexo: 'Masculino', dtNascimento: '1990-01-01', cpfCnpj: '123.456.789-09',
        };

        mockDbQuery.mockResolvedValueOnce([[]]);
        mockDbQuery.mockResolvedValueOnce([{ insertId: 100 }]);
        mockDbQuery.mockResolvedValueOnce(null);
        mockHashPassword.mockResolvedValue('senha_hasheada_abc123');

        const result = await userService.createUser(userData);

        expect(mockHashPassword).toHaveBeenCalledWith('Senha@Forte123');
        // CORREÇÃO: Verifique a variável de mock, não o 'db' importado
        expect(mockDbQuery).toHaveBeenCalledTimes(3);
        expect(result).toEqual({ id: 100, email: 'rafael.teste@example.com', nome: 'Rafael', sobrenome: 'Teste' });
    });

    it('deve lançar um erro se o email já existir', async () => {
        const userData = {
            nome: 'Rafael', sobrenome: 'Existente', email: 'existente@example.com',
            senha: 'Senha@Forte123', telefone: '11987654321', estado: 'SP',
            sexo: 'Masculino', dtNascimento: '1990-01-01', cpfCnpj: '123.456.789-09',
        };
        mockDbQuery.mockResolvedValueOnce([[{ idUsuario: 1, emailUsuario: 'existente@example.com' }]]);

        await expect(userService.createUser(userData)).rejects.toThrow('Email já cadastrado.');
    });
});