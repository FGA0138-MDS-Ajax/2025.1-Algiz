export function validatePasswordsMatch(senha, repetirSenha) {
  if (senha !== repetirSenha) {
    return "As senhas não coincidem.";
  }
  return null;
}

export function validateTelefone(telefone) {
  if (!telefone) return "Telefone é obrigatório.";
  const valor = telefone.trim();
  const regex = /^\(\d{2}\)\s?\d{4}-\d{4}$/;
  if (!regex.test(valor)) {
    return "Telefone deve estar no formato (XX)XXXX-XXXX.";
  }
  return null;
}

export function validateCelular(celular) {
  if (!celular) return "Celular é obrigatório.";
  const valor = celular.replace(/\D/g, ""); // remove non-digits
  if (valor.length !== 11) {
    return "Celular deve conter 11 dígitos (DDD + número).";
  }
  return null;
}

export function validarSenhaCompleta(senha) {
  if (senha.length < 8) {
    return ["A senha deve conter no mínimo 8 caracteres."];
  }
  if (!/[A-Z]/.test(senha)) {
    return ["A senha deve conter ao menos uma letra maiúscula."];
  }
  if (!/\d/.test(senha)) {
    return ["A senha deve conter ao menos um número."];
  }
  if (!/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]]/.test(senha)) {
    return ["A senha deve conter ao menos um caractere especial."];
  }
  return [];
}

export function validateEmail(email) {
  if (!email) return "Email é obrigatório.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "O email deve estar no formato nomeusuario@nomedoservico.dominio.";
  }
  return null;
}

export function validateCPF(cpf) {
  if (!cpf) return "CPF é obrigatório.";

  // Remove tudo que não for dígito
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11) {
    return "CPF deve conter exatamente 11 dígitos.";
  }

  // Agora verifica se está em um dos dois formatos aceitos
  const regex = /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;
  if (!regex.test(cpf)) {
    return "CPF deve estar no formato 136.113.190-07 ou 13611319007.";
  }

  return null;
}

export function validateCadastro(form) {
  const passMatch = validatePasswordsMatch(form.senha, form.repetirSenha);
  if (passMatch) return { field: "repetirSenha", message: passMatch };

  const senhaErros = validarSenhaCompleta(form.senha);
  if (senhaErros && senhaErros.length > 0) return { field: "senha", message: senhaErros.join(" ") };

  // Sempre valida celular
  const cel = validateCelular(form.celular);
  if (cel) return { field: "celular", message: cel };

  // Valida CPF
  const cpf = validateCPF(form.cpfCnpj);
  if (cpf) return { field: "cpfCnpj", message: cpf };

  const email = validateEmail(form.email);
  if (email) return { field: "email", message: email };

  return null;
}
