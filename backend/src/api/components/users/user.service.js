const db = require('../../config/db');
const { hashPassword } = require('../../utils/hash.util'); 
const { cpf, cnpj } = require('cpf-cnpj-validator'); 
const jwt = require('jsonwebtoken');
const {comparePassword} = require('src/api/utils/hash.password.js');

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
        const tiposValidos = ['EMPRESA', 'USUARIO', 'ADMIN'];
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
        
        const error = new Error('Email já cadastrado.');
        error.name = 'ConflictError'; // Um nome de erro diferente pode ser útil
        throw error;
    }

    // 4. Hashear a senha
    const hashedPassword = await hashPassword(senha);

    // 5. Montar o objeto do novo usuário
    const newUserPayload = {
        nomeCompleto, 
        email,        
        senha: hashedPassword,
        tipoUsuario,  
        cpfCnpj       
    };

    // 6. Inserir no banco de dados
    const result = await db.query(
        'INSERT INTO usuarios (nome_completo, email, senha_hash, tipo_usuario, cpf_cnpj) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [newUserPayload.nomeCompleto, newUserPayload.email, newUserPayload.senha, newUserPayload.tipoUsuario, newUserPayload.cpfCnpj]
    );

    // 7. Retornar o ID do usuário criado e os dados (sem a senha hasheada, se preferir)
    const { senha: _, ...userDataToReturn } = newUserPayload;

    return { id: result.rows[0].id, ...userDataToReturn };
}
async function findUserProfileById(userId) {
   
    const userQuery = `
        SELECT
            u.id,
            u.name,
            u.email,
            u.telefone, -- Adicione estas colunas 
            u.estado,   -- Adicione estas colunas 
            u.foto_perfil_url, -- Adicione estas colunas
            u.banner_url,      -- Adicione estas colunas
            e.id as empresa_id,
            e.nome as empresa_nome,
            e.descricao as empresa_descricao
        FROM usuarios u
        LEFT JOIN empresas e ON u.empresa_id_associada = e.id -- Supondo que 'usuarios' tem uma FK para 'empresas'
        WHERE u.id = ?;
    `;
    const [userRows] = await db.query(userQuery, [userId]);

    if (userRows.length === 0) {
        return null;
    }
    const userProfile = userRows[0];

    const followedCompaniesQuery = `
        SELECT
            e.id,
            e.nome,
            e.logo_url
        FROM empresas e
        INNER JOIN usuarios_seguem_empresas usf ON e.id = usf.empresa_id
        WHERE usf.usuario_id = ?;
    `;
    const [followedCompaniesRows] = await db.query(followedCompaniesQuery, [userId]);

    const finalResponse = {
        nome: userProfile.name,
        email: userProfile.email,
        telefone: userProfile.telefone,
        estado: userProfile.estado,
        foto_perfil_url: userProfile.foto_perfil_url,
        banner_url: userProfile.banner_url,
        dados_empresa_associada: userProfile.empresa_id ? {
            id: userProfile.empresa_id,
            nome: userProfile.empresa_nome,
            descricao: userProfile.empresa_descricao
        } : null,
        empresas_seguidas: followedCompaniesRows
    };

    return finalResponse;

}
    

module.exports = {
    createUser, authenticateUser,findUserProfileById
};