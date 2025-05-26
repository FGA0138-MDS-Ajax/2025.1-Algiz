const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.get('/protected', verifyToken, (req, res) => {
  res.json({
    message: 'Você acessou uma rota protegida!',
    user: req.user
  });
});

module.exports = router;
