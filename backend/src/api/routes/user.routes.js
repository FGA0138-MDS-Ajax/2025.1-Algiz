// backend/src/api/routes/user.routes.js
import express from "express";
import userController from "../components/users/user.controller.js";
import verifyToken from "../../middleware/auth.middleware.js";
import db from "../config/db.js";
import { upload } from "../../middleware/upload.middleware.js";

const router = express.Router();

// 📢 PUBLIC POST ROUTES (no token needed)
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/usuarios/forgot-password", userController.forgotPassword);
router.post("/usuarios/verify-code", userController.verifyResetCode);
router.post("/usuarios/reset-password", userController.resetPassword);

// 🔐 PROTECTED ROUTES (need valid token)
router.get("/usuario/:id", verifyToken, userController.getUserProfile);
router.post("/usuario/:id/edit", verifyToken, userController.editUserProfile);
router.post("/usuario/:id/foto",
  verifyToken,
  upload.single('fotoPerfil'),  // multer
  userController.editUserProfilePhoto
);

router.post("/usuario/:id/banner",
  verifyToken,
  upload.single('bannerPerfil'),
  userController.editUserBanner
);

router.post("/usuario/:id/foto-default", verifyToken, userController.setUserDefaultProfilePhoto);
router.post("/usuario/:id/banner-default", verifyToken, userController.setUserDefaultBanner);

// 🔧 DEBUG/UTILITY: List all users (keep protected if needed)
router.get("/usuarios", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM USUARIO");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal server error fetching users" });
  }
});

// 📢 PUBLIC GET ROUTES (no token needed)
router.get("/usuarios/:id/publico", userController.getPublicUserProfile);

export default router;
