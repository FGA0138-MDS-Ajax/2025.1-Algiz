const db = require('../../../db');
const { hashPassword } = require('../../utils/hash.util'); // comparePassword não é usado aqui
const { cpf, cnpj } = require('cpf-cnpj-validator'); // << IMPORTAR A LIB AQUI

async function createUser(userData) {
    const { nomeCompleto, email, senha, tipoUsuario, cpfCnpj } = userData;
    const erros = [];

    // 1. Validações de campos obrigatórios e formato
    if (!nomeCompleto || nomeCompleto.trim() === "") {
        erros.push({ campo: "nomeCompleto", mensagem: "Nome completo é obrigatório." });
    }
    if (!email || email.trim() === "") {
        erros.push({ campo: "email", mensagem: "Email é obrigatório." });
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            erros.push({ campo: "email", mensagem: "Formato de e-mail inválido." });
        }
    }
    if (!senha) {
        erros.push({ campo: "senha", mensagem: "Senha é obrigatória." });
    } else {
        // Validações de senha
        if (senha.length < 8) {
            erros.push({ campo: "senha", mensagem: "Senha deve ter no mínimo 8 caracteres." });
        }
        if (!/[A-Z]/.test(senha)) {
            erros.push({ campo: "senha", mensagem: "Senha deve conter pelo menos uma letra maiúscula." });
        }
        if (!/[a-z]/.test(senha)) {
            erros.push({ campo: "senha", mensagem: "Senha deve conter pelo menos uma letra minúscula." });
        }
        if (!/\d/.test(senha)) {
            erros.push({ campo: "senha", mensagem: "Senha deve conter pelo menos um número." });
        }
    }
    if (!tipoUsuario || tipoUsuario.trim() === "") {
        erros.push({ campo: "tipoUsuario", mensagem: "Tipo de usuário é obrigatório." });
    } else {
        const tiposValidos = ['EMPRESA', 'INTERESSADO', 'ADMIN'];
        if (!tiposValidos.includes(tipoUsuario.toUpperCase())) {
            erros.push({ campo: "tipoUsuario", mensagem: `Tipo de usuário inválido. Permitidos: ${tiposValidos.join(', ')}` });
        }
    }

    // Validação CPF/CNPJ
    if (!cpfCnpj || cpfCnpj.trim() === "") {
        erros.push({ campo: "cpfCnpj", mensagem: "CPF/CNPJ é obrigatório." });
    } else {
        const valorLimpo = cpfCnpj.replace(/\D/g, '');
        let ehValido = false;

        if (valorLimpo.length === 11) {
            ehValido = cpf.isValid(valorLimpo);
        } else if (valorLimpo.length === 14) {
            ehValido = cnpj.isValid(valorLimpo);
        } else {
            // Nem 11 nem 14 dígitos após limpar, então formato já é inválido
            // A biblioteca não seria chamada, então `ehValido` permaneceria false
        }

        if (!ehValido) {
            // Se não for válido pela biblioteca OU se o tamanho não for 11 nem 14
            erros.push({ campo: "cpfCnpj", mensagem: "CPF/CNPJ inválido (formato ou dígitos verificadores)." });
        }
    }

    // 2. Se houver erros de validação, lançar exceção
    if (erros.length > 0) {
        const error = new Error("Erro de validação");
        error.name = 'ValidationError';
        error.details = erros;
        throw error;
    }

    // 3. Verificar se o e-mail já existe (após validações básicas)
    const existingUser = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (existingUser.rows && existingUser.rows.length > 0) {
        // É uma boa prática não detalhar se o email ou o CPF/CNPJ já existe para evitar enumeração de usuários
        // Mas se a regra de negócio exige, você pode separar as mensagens.
        // Para simplificar, um erro genérico ou um específico para email.
        const error = new Error('Email já cadastrado.');
        error.name = 'ConflictError'; // Um nome de erro diferente pode ser útil
        throw error;
    }

    // 4. Hashear a senha
    const hashedPassword = await hashPassword(senha);

    // 5. Montar o objeto do novo usuário
    const newUserPayload = {
        nomeCompleto, // usa a variável desestruturada
        email,        // usa a variável desestruturada
        senha: hashedPassword,
        tipoUsuario,  // usa a variável desestruturada
        cpfCnpj       // usa a variável desestruturada
    };

    // 6. Inserir no banco de dados
    const result = await db.query(
        'INSERT INTO usuarios (nome_completo, email, senha_hash, tipo_usuario, cpf_cnpj) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [newUserPayload.nomeCompleto, newUserPayload.email, newUserPayload.senha, newUserPayload.tipoUsuario, newUserPayload.cpfCnpj]
    );

    // 7. Retornar o ID do usuário criado e os dados (sem a senha hasheada, se preferir)
    // O objeto newUserPayload já contém os dados corretos (com senha hasheada)
    // Se não quiser retornar a senha hasheada:
    const { senha: _, ...userDataToReturn } = newUserPayload;

    return { id: result.rows[0].id, ...userDataToReturn };
}

module.exports = {
    createUser
};