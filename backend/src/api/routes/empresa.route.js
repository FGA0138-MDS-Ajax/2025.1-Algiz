import { Router } from 'express';
import multer from 'multer';
import * as empresaController from '../components/empresas/empresa.controller.js';
import verifyToken from '../../middleware/auth.middleware.js';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ 
  storage, 
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Rotas existentes...
router.post('/register', verifyToken, empresaController.registerEmpresa);
router.get('/', empresaController.getAllEmpresas);
router.get('/minha', verifyToken, empresaController.getMinhaEmpresa);
router.get('/:id', empresaController.getEmpresaById);
router.get('/:id/postagens', empresaController.getEmpresaPostagens);
router.put('/:id/edit', verifyToken, empresaController.updateEmpresa);

// Rotas para upload de imagens
router.patch('/:id/foto',
  verifyToken,
  upload.single('foto'), 
  empresaController.updateEmpresaPhoto
);

router.patch('/:id/banner',
  verifyToken,
  upload.single('banner'), 
  empresaController.updateEmpresaBanner
);

// ADICIONAR ESTAS ROTAS PARA DEFINIR IMAGENS PADRÃO
router.put('/:id/foto/default', verifyToken, empresaController.setEmpresaDefaultPhoto);
router.put('/:id/banner/default', verifyToken, empresaController.setEmpresaDefaultBanner);

// Outras rotas...
router.get('/:id/usuarios', empresaController.getUsuariosVinculados);
router.post('/:id/follow', verifyToken, empresaController.followEmpresa);
router.delete('/:id/follow', verifyToken, empresaController.unfollowEmpresa);
router.get('/:id/follow/status', verifyToken, empresaController.checkFollowStatus);
router.get('/:id/followers', empresaController.getEmpresaFollowers);
router.patch('/:id/descricao', verifyToken, empresaController.updateEmpresaDescricao);
router.get('/:id/descricao', empresaController.getEmpresaDescricao);

export default router;
