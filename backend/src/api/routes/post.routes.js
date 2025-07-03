import { Router } from 'express';
import authMiddleware from '../../middleware/auth.middleware.js';
import { create } from '../components/posts/post.controller.js';

const router = Router();

router.post('/posts', authMiddleware, create);

export default router;