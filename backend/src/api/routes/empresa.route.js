import { Router } from 'express';
import multer from 'multer';
import * as empresaController from '../components/empresas/empresa.controller.js';
import verifyToken from '../../middleware/auth.middleware.js';        // ✅ USAR DEFAULT IMPORT

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ 
  storage, 
  limits: { fileSize: 5 * 1024 * 1024 }
});

// ✅ ALTERAR: authenticateToken → verifyToken
router.post('/register', verifyToken, empresaController.registerEmpresa);
router.get('/', empresaController.getAllEmpresas);
router.get('/minha', verifyToken, empresaController.getMinhaEmpresa);
router.get('/:id', empresaController.getEmpresaById);
router.get('/:id/postagens', empresaController.getEmpresaPostagens);
router.put('/:id/edit', verifyToken, empresaController.updateEmpresa);

router.patch('/:id/foto',
  verifyToken,                                                        // ✅ ALTERAR
  upload.single('foto'), 
  empresaController.updateEmpresaPhoto
);

router.patch('/:id/banner',
  verifyToken,                                                        // ✅ ALTERAR
  upload.single('banner'), 
  empresaController.updateEmpresaBanner
);

// Adicionar esta nova rota

// Nova rota para buscar usuários vinculados a uma empresa
router.get('/:id/usuarios', empresaController.getUsuariosVinculados);

// Restante do código permanece o mesmo

export default router;
