// src/api/utils/validation.util.js
import { cpf, cnpj } from 'cpf-cnpj-validator';

export function isValidDocument(documento) {
  if (!documento || typeof documento !== 'string') return false;

  const valorLimpo = documento.replace(/\D/g, '');

  if (valorLimpo.length === 11) {
    return cpf.isValid(valorLimpo);
  }
  if (valorLimpo.length === 14) {
    return cnpj.isValid(valorLimpo);
  }
  return false;
}