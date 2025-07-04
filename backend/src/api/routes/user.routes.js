// backend/src/api/routes/user.routes.js
import express from "express";
import userController from "../components/users/user.controller.js";
import verifyToken from "../../middleware/auth.middleware.js";
import db from "../config/db.js";
import { upload } from "../../middleware/upload.middleware.js";

const router = express.Router();

/* 📢 ROTAS PÚBLICAS (sem necessidade de autenticação) */
router.post("/users/register", userController.registerUser); // Registro de novo usuário
router.post("/users/login", userController.loginUser);       // Login do usuário
router.post("/users/forgot-password", userController.forgotPassword); // Enviar código de recuperação
router.post("/users/verify-code", userController.verifyResetCode);    // Verificar código de recuperação
router.post("/users/reset-password", userController.resetPassword);   // Redefinir senha com código

/* 🔐 ROTAS PROTEGIDAS (requer token de autenticação válido) */
router.get("/users/:id/profile", verifyToken, userController.getUserProfile); // Obter perfil privado do usuário
router.put("/users/:id/profile", verifyToken, userController.editUserProfile); // Editar perfil do usuário

router.put(
  "/users/:id/photo", // Atualizar foto de perfil
  verifyToken,
  upload.single('fotoPerfil'),
  userController.editUserProfilePhoto
);

router.put(
  "/users/:id/banner", // Atualizar banner de perfil
  verifyToken,
  upload.single('bannerPerfil'),
  userController.editUserBanner
);

router.put("/users/:id/photo/default", verifyToken, userController.setUserDefaultProfilePhoto); // Restaurar foto padrão
router.put("/users/:id/banner/default", verifyToken, userController.setUserDefaultBanner);      // Restaurar banner padrão

router.put("/users/:id/password", verifyToken, userController.updatePassword); // Atualizar senha do usuário

/* 🔧 UTILITÁRIO/DEBUG: Listar todos os usuários do banco (pode ser mantido protegido) */
router.get("/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM USUARIO");
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    res.status(500).json({ error: "Erro interno ao buscar usuários" });
  }
});

/* 📢 ROTA PÚBLICA: Perfil público de um usuário (sem necessidade de autenticação) */
router.get("/users/:id/public", userController.getPublicUserProfile); // Obter perfil público

export default router;