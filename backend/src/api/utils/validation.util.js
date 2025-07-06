/**
 * @param {string} cpf - O CPF a ser validado, pode conter máscara.
 * @returns {boolean} - Retorna true se o CPF for válido, senão false.
 */
function validarCPF(cpf) {
  const cpfLimpo = String(cpf).replace(/\D/g, '');
  if (cpfLimpo.length !== 11 || /^(\d)\1+$/.test(cpfLimpo)) {
    return false;
  }

  const numeros = cpfLimpo.split('').map(Number);

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += numeros[i] * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;


  if (resto !== numeros[9]) {
    return false;
  }

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += numeros[i] * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;

  if (resto !== numeros[10]) {
    return false;
  }

  return true;
}

/**
 * Valida um número de CNPJ.
 * @param {string} cnpj - O CNPJ a ser validado, pode conter máscara.
 * @returns {boolean} - Retorna true se o CNPJ for válido, senão false.
 */
function validarCNPJ(cnpj) {

  const cnpjLimpo = String(cnpj).replace(/\D/g, '');

  if (cnpjLimpo.length !== 14 || /^(\d)\1+$/.test(cnpjLimpo)) {
    return false;
  }
  

  const numeros = cnpjLimpo.split('').map(Number);
  

  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  

  let soma = 0;
  for (let i = 0; i < 12; i++) {
    soma += numeros[i] * pesos1[i];
  }
  let resto = soma % 11;
  const digito1 = resto < 2 ? 0 : 11 - resto;


  if (digito1 !== numeros[12]) {
    return false;
  }

  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  

  soma = 0;
  for (let i = 0; i < 13; i++) {
    soma += numeros[i] * pesos2[i];
  }
  resto = soma % 11;
  const digito2 = resto < 2 ? 0 : 11 - resto;


  if (digito2 !== numeros[13]) {
    return false;
  }
  

  return true;
}

/**
 * Função principal que verifica se um documento (CPF ou CNPJ) é válido.
 * @param {string} documento - O documento (CPF ou CNPJ) a ser validado.
 * @returns {boolean}
 */
export function isValidDocument(documento) {
  if (!documento || typeof documento !== 'string') return false;

  const valorLimpo = documento.replace(/\D/g, '');

  if (valorLimpo.length === 11) {

    return validarCPF(valorLimpo);
  }
  
  if (valorLimpo.length === 14) {

    return validarCNPJ(valorLimpo);
  }
  
  return false;
}