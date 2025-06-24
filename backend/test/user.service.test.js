import userService from '../src/api/components/users/user.service.js';
// Vamos assumir que você exportou a lógica de validação para um ficheiro de utilitários.
import { isValidDocument } from '../src/api/utils/validation.util.js';

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
        it('deve retornar falso para documento com letras', () => {
            expect(isValidDocument('123.abc.456-78')).toBe(false);
        });

        it('deve retornar falso para documento com símbolos', () => {
            expect(isValidDocument('123!456$789-00')).toBe(false);
        });

        it('deve retornar falso para documento com menos de 11 dígitos', () => {
            expect(isValidDocument('123.456.789')).toBe(false);
        });

        it('deve retornar falso para documento com 12 ou 13 dígitos', () => {
            expect(isValidDocument('123456789012')).toBe(false);
        });
    });

    // --- Tarefa: Testar entradas válidas reais ---
    describe('Entradas válidas', () => {
        it('deve retornar verdadeiro para um CPF válido (com máscara)', () => {
            // Use um CPF válido gerado para testes
            expect(isValidDocument('215.399.738-42')).toBe(true);
        });

        it('deve retornar verdadeiro para um CPF válido (sem máscara)', () => {
            expect(isValidDocument('21539973842')).toBe(true);
        });

        it('deve retornar verdadeiro para um CNPJ válido (com máscara)', () => {
            // Use um CNPJ válido gerado para testes
            expect(isValidDocument('86.438.361/0001-38')).toBe(true);
        });

        it('deve retornar verdadeiro para um CNPJ válido (sem máscara)', () => {
            expect(isValidDocument('86438361000138')).toBe(true);
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