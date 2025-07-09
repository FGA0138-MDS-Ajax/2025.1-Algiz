import express from 'express';
import verifyToken from '../../middleware/auth.middleware.js';
import uploadData from '../../middleware/upload.middleware.js'; // Nosso middleware de upload
import * as documentController from '../components/documentos/documento.controller.js';

const router = express.Router();

// ROTA DE UPLOAD: POST /api/documentos
router.post('/', verifyToken, uploadData.single('documento'), documentController.uploadDocumento);

// NOVA ROTA DE DOWNLOAD: GET /api/documentos/:id
// O ':id' aqui é o idDocumento do nosso banco de dados.
router.get('/:id', verifyToken, documentController.getDocumento);

// NOVA ROTA DE EXCLUSÃO: DELETE /api/documentos/:id
router.delete('/:id', verifyToken, documentController.deleteDocumento);

export default router;