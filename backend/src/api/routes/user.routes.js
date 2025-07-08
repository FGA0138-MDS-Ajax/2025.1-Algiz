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

export default router;