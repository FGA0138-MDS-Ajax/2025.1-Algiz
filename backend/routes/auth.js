const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const USERS = [{ username: 'admin', password: '1234' }];

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = USERS.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET || 'secreto', {
    expiresIn: '1h',
  });

  res.json({ token });
});

module.exports = router;
