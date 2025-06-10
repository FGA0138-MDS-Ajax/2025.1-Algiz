const express = require('express');
const router = express.Router();
const userController = require('src/api/components/users/user.controller'); 
const verifyToken = require('../../middleware/auth.middleware')



router.post('/', userController.registerUser);
router.post('/register', userController.registerUser);

// ---------- DEFINIÇÃO DAS ROTAS DE USUÁRIO -------

/**
 * @route   POST /api/usuarios
 * @desc    Registrar um novo usuário
 * @access  Public
 */

router.post('/', userController.registerUser);
router.get('/:id', verifyToken, userController.getUserProfile);

const db = require('config/db');
router.get('/', async(req, res) =>{
    try{
        const[rows] = await db.query('SELECT * FROM users');
        res.json(rows);
    }catch(err){
        console.error('Error fetching users:', err);
        res.status(500).json({error:'Internal server error fetching users'})
    }
})

module.exports = router;