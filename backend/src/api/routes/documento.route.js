import express from 'express';
import verifyToken from '../../middleware/auth.middleware.js';
import upload from '../../middleware/upload.middleware.js'; // Nosso middleware de upload
import * as documentController from '../components/documents/document.controller.js';

const router = express.Router();

// ROTA DE UPLOAD: POST /api/documentos
// 1. verifyToken: Garante que o utilizador está logado.
// 2. upload.single('documento'): Processa um único ficheiro do campo 'documento'.
router.post('/', verifyToken, upload.single('documento'), documentController.uploadDocumento);

// Adicione as outras rotas aqui depois
 router.get('/:id', verifyToken, documentController.downloadDocumento);
router.delete('/:id', verifyToken, documentController.deleteDocumento);

export default router;
