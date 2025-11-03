// src/routes/auth.js
const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Credenciais inválidas' });
  const payload = { id: user._id, name: user.name, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
  return res.json({ token, user: payload });
});

module.exports = router;
