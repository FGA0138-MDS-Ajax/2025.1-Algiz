import express from 'express';
import verifyToken from '../../middleware/auth.middleware.js';
import * as empresaController from '../components/empresa/empresa.controller.js';

const router = express.Router();

router.post('/', verifyToken, empresaController.registerEmpresa);
router.get('/', empresaController.getAllEmpresas);
router.get('/:cnpj', empresaController.getEmpresaById);
// Adicione a rota PUT para atualização
router.put('/:cnpj', verifyToken, empresaController.updateEmpresa);

export default router;
