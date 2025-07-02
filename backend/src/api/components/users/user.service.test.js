// Vamos assumir que você exportou a lógica de validação para um ficheiro de utilitários.
import { isValidDocument } from '../../utils/validation.util.js';

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
        it('deve retornar falso para um CPF com dígitos verificadores incorretos', () => {
            expect(isValidDocument('111.222.333-45')).toBe(false);
        });

        it('deve retornar falso para um CNPJ com dígitos verificadores incorretos', () => {
            expect(isValidDocument('11.222.333/0001-45')).toBe(false);
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