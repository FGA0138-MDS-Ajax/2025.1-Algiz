import express from 'express';
import verifyToken from '../../middleware/auth.middleware.js';

// Importa todas as funções do controller de uma vez.
import * as empresaController from '../components/empresa/empresa.controller.js';

const router = express.Router();

// ROTA PARA CADASTRAR uma nova empresa (protegida)
router.post('/', verifyToken, empresaController.registerEmpresa);

// ROTA PARA BUSCAR TODAS as empresas (pública)
router.get('/', empresaController.getAllEmpresas);

// ROTA PARA BUSCAR UMA empresa específica pelo seu CNPJ (pública)
router.get('/:cnpj', empresaController.getEmpresaById);

 export default router;
