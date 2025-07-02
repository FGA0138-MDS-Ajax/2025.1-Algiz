import express from 'express';
import verifyToken from '../../middleware/auth.middleware.js';
import { cargoPermitido } from '../../middleware/role.middleware.js';
import { CARGOS } from '../utils/cargos.js';

// Importa todas as funções do controller de EMPRESA de uma vez.
import * as empresaController from '../components/empresas/empresa.controller.js';
// Importa todas as funções do controller de VINCULO de uma vez.
import * as vinculoController from '../components/vinculos/vinculo.controller.js';

const router = express.Router();

// ROTA PARA CADASTRAR uma nova empresa (protegida)
router.post('/empresa', verifyToken, empresaController.registerEmpresa);

// ROTA PARA BUSCAR TODAS as empresas (pública)
router.get('/empresa', empresaController.getAllEmpresas);

// ROTA PARA BUSCAR UMA empresa específica pelo seu CNPJ (pública)
router.get('/:cnpj', empresaController.getEmpresaById);

// ROTA PARA ACESSAR a aba de contratos da empresa --> Com verificação de cargos (protegida)
router.get('/empresa/:cnpj/contratos',
  cargoPermitido([CARGOS.DONO, CARGOS.VICE, CARGOS.GESTOR]),
  (req, res) => {
    // Lógica para retornar os contratos da empresa
    res.json({ mensagem: 'Acesso autorizado' });
  }
);

// ✅ Usuário envia solicitação de vínculo
router.post('/empresa/solicitar-vinculo', verifyToken, vinculoController.solicitarVinculo);

// ✅ Dono de Empresa aprova uma solicitação (passa o ID da solicitação)
router.patch('/empresa/aprovar/:idSolicitacao',
  verifyToken,
  cargoPermitido([CARGOS.DONO]),
  vinculoController.aprovarSolicitacaoVinculo
);

export default router;