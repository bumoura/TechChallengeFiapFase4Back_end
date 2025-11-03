// src/routes/docentes.js
const { Router } = require('express');
const { Docente } = require('../models/People');
const { authMiddleware, onlyProfessor } = require('../middleware/auth');

const router = Router();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page ?? '1', 10);
  const limit = parseInt(req.query.limit ?? '10', 10);
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Docente.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    Docente.countDocuments({})
  ]);
  res.json({ items, total, page, limit });
});

router.get('/:id', async (req,res)=>{
  const d = await Docente.findById(req.params.id);
  if(!d) return res.status(404).json({message:'Não encontrado'});
  res.json(d);
});

router.post('/', authMiddleware, onlyProfessor, async (req, res) => {
  const { nome, email } = req.body;
  const d = await Docente.create({ nome, email });
  res.status(201).json(d);
});

router.put('/:id', authMiddleware, onlyProfessor, async (req, res) => {
  const { nome, email } = req.body;
  const d = await Docente.findByIdAndUpdate(req.params.id, { nome, email }, { new: true });
  res.json(d);
});

router.delete('/:id', authMiddleware, onlyProfessor, async (req, res) => {
  await Docente.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
