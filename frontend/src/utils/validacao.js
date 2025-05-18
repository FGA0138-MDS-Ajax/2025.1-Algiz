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

export function validateSenhaForte(senha) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  if (!regex.test(senha)) {
    return "A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número.";
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

    const cel = validateCelular(form.celular);
    if (cel) return { field: "celular", message: cel };
  } else {
    const cel = validateCelular(form.celular);
    if (cel) return { field: "celular", message: cel };
  }

  return null;
}
