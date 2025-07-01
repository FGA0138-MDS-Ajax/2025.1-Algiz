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
  const valor = celular.trim();
  const regex = /^\(\d{2}\)\s?\d{5}-\d{4}$/;
  if (!regex.test(valor)) {
    return "Celular deve estar no formato (XX)XXXXX-XXXX.";
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

export function validateCadastro(form, tipo) {
  const passMatch = validatePasswordsMatch(form.senha, form.repetirSenha);
  if (passMatch) return { field: "repetirSenha", message: passMatch };

  const senhaForte = validateSenhaForte(form.senha);
  if (senhaForte) return { field: "senha", message: senhaForte };

  if (tipo === "empresa") {
    const tel = validateTelefone(form.telefone);
    if (tel) return { field: "telefone", message: tel };
  } else {
    const cel = validateCelular(form.celular);
    if (cel) return { field: "celular", message: cel };
  }

  const email = validateEmail(form.email);
  if (email) return { field: "email", message: email };

  return null;
}
