// src/routes/alunos.js
const { Router } = require('express');
const { Aluno } = require('../models/People');
const { authMiddleware, onlyProfessor } = require('../middleware/auth');

const router = Router();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page ?? '1', 10);
  const limit = parseInt(req.query.limit ?? '10', 10);
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Aluno.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    Aluno.countDocuments({})
  ]);
  res.json({ items, total, page, limit });
});

router.get('/:id', async (req,res)=>{
  const a = await Aluno.findById(req.params.id);
  if(!a) return res.status(404).json({message:'Não encontrado'});
  res.json(a);
});

router.post('/', authMiddleware, onlyProfessor, async (req, res) => {
  const { nome, email } = req.body;
  const a = await Aluno.create({ nome, email });
  res.status(201).json(a);
});

router.put('/:id', authMiddleware, onlyProfessor, async (req, res) => {
  const { nome, email } = req.body;
  const a = await Aluno.findByIdAndUpdate(req.params.id, { nome, email }, { new: true });
  res.json(a);
});

router.delete('/:id', authMiddleware, onlyProfessor, async (req, res) => {
  await Aluno.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
