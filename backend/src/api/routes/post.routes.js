import { Router } from 'express';
import multer from 'multer';
import authMiddleware from '../../middleware/auth.middleware.js';
import { 
  create, 
  list, 
  getById, 
  toggleLike, 
  toggleSave, 
  getSavedPosts 
} from '../components/posts/post.controller.js';
import { 
  addComentario, 
  getComentarios, 
  deleteComentario 
} from '../components/posts/comentario.controller.js';

const router = Router();

// Configuração do Multer para processamento de upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({ 
  storage, 
  limits: { fileSize: 5 * 1024 * 1024 } // Limite de 5MB
});

// Rotas públicas
router.get('/posts', list);
router.get('/posts/:id', getById);
router.get('/posts/:id/comentarios', getComentarios);

// Rotas que exigem autenticação
router.post('/posts', authMiddleware, upload.single('imagem'), create);
router.post('/posts/:id/like', authMiddleware, toggleLike);
router.post('/posts/:id/save', authMiddleware, toggleSave);
router.get('/users/me/saved-posts', authMiddleware, getSavedPosts);

// Rotas para comentários
router.post('/posts/:id/comentarios', authMiddleware, addComentario);
router.delete('/comentarios/:id', authMiddleware, deleteComentario);

export default router;