// src/middleware/auth.js
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Token ausente' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

function onlyProfessor(req, res, next) {
  if (req.user?.role !== 'professor') return res.status(403).json({ message: 'Apenas professores' });
  next();
}

module.exports = { authMiddleware, onlyProfessor };
