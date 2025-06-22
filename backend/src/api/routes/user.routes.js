import express from 'express';
import userController from '../components/users/user.controller.js';
import verifyToken from '../../middleware/auth.middleware.js';
import db from '../config/db.js'; // Now imports the connection pool

const router = express.Router();

router.post('/company', userController.registerCompany);
router.post('/register', userController.registerUser); // Remove verifyToken middleware
router.get('/:id', verifyToken, userController.getUserProfile); // Keep protected
router.post('/login', userController.loginUser);

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM USUARIO');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error fetching users' });
  }
});

export default router;
