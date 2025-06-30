import express from 'express';
import verifyToken from '../../middleware/auth.middleware.js';

// Importa todas as funções do controller de uma vez.
import * as enterpriseController from '../components/enterprise/enterprise.controller.js';

const router = express.Router();

// ROTA PARA CADASTRAR uma nova empresa (protegida)
router.post('/', verifyToken, enterpriseController.registerEmpresa);

// ROTA PARA BUSCAR TODAS as empresas (pública)
router.get('/', enterpriseController.getAllEmpresas);

// ROTA PARA BUSCAR UMA empresa específica pelo seu CNPJ (pública)
router.get('/:cnpj', enterpriseController.getEmpresaById);