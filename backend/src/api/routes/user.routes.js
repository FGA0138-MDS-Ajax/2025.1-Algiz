// backend/src/api/routes/user.routes.js
import express from "express";
import userController from "../components/users/user.controller.js";
import verifyToken from "../../middleware/auth.middleware.js";        // ✅ USAR DEFAULT IMPORT
import db from "../config/db.js";
import { upload } from "../../middleware/upload.middleware.js";

const router = express.Router();

/* 📢 ROTAS PÚBLICAS (sem necessidade de autenticação) */
router.post("/register", userController.registerUser); // Registro de novo usuário
router.post("/login", userController.loginUser);       // Login do usuário
router.post("/forgot-password", userController.forgotPassword); // Enviar código de recuperação
router.post("/verify-code", userController.verifyResetCode);    // Verificar código de recuperação
router.post("/reset-password", userController.resetPassword);   // Redefinir senha com código

// Rota de refresh token e logout
router.get('/refresh', userController.refreshToken); // Rota para refresh de token
router.post("/logout", userController.logout);

/* 🔐 ROTAS PROTEGIDAS (requer token de autenticação válido) */
router.get("/:id/profile", verifyToken, userController.getUserProfile);
router.get("/:id/empresas", verifyToken, userController.getEmpresasAssociadas); // ✅ NOVA ROTA
router.put("/:id/profile", verifyToken, userController.editUserProfile);

router.put(
  "/:id/photo", // Atualizar foto de perfil
  verifyToken,
  upload.single('fotoPerfil'),
  userController.editUserProfilePhoto
);

router.put(
  "/:id/banner", // Atualizar banner de perfil
  verifyToken,
  upload.single('bannerPerfil'),
  userController.editUserBanner
);

router.put("/:id/photo/default", verifyToken, userController.setUserDefaultProfilePhoto); // Restaurar foto padrão
router.put("/:id/banner/default", verifyToken, userController.setUserDefaultBanner);      // Restaurar banner padrão

router.put("/:id/update-password", verifyToken, userController.updatePassword); // Atualizar senha do usuário

/* 🔧 UTILITÁRIO/DEBUG: Listar todos os usuários do banco (pode ser mantido protegido) */
router.get("/all", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM USUARIO");
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    res.status(500).json({ error: "Erro interno ao buscar usuários" });
  }
});

/* 📢 ROTA PÚBLICA: Perfil público de um usuário (sem necessidade de autenticação) */
router.get("/:id/public", userController.getPublicUserProfile); // Obter perfil público

// Rota pública para acessar posts salvos por um usuário
router.get("/:userId/salvos", async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Primeiro, verificar se existem posts salvos por este usuário
    const [salvos] = await db.query(`
      SELECT idPost FROM SALVA WHERE idUsuario = ?
    `, [userId]);
    
    if (salvos.length === 0) {
      console.log(`Usuário ${userId} não tem posts salvos.`);
      return res.status(200).json([]);
    }
    
    // Extrair IDs dos posts salvos
    const postIds = salvos.map(s => s.idPost);
    
    // Usar POSTAGENS (nome correto da tabela) em vez de POST
    const [posts] = await db.query(`
      SELECT p.*, j.nomeComercial, j.cnpjJuridico, s.salvo_em
      FROM POSTAGENS p
      INNER JOIN SALVA s ON p.idPost = s.idPost
      LEFT JOIN JURIDICO j ON p.idEmpresa = j.idEmpresa
      WHERE p.idPost IN (?)
      ORDER BY s.salvo_em DESC
    `, [postIds]);
    
    console.log(`✅ Encontrados ${posts.length} posts salvos para o usuário ${userId}`);
    
    return res.status(200).json(posts);
    
  } catch (error) {
    console.error("Erro ao buscar posts salvos:", error);
    return res.status(500).json({ erro: "Ocorreu um erro ao buscar os posts salvos" });
  }
});

export default router;