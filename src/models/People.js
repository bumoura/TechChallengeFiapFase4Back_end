// src/models/People.js
const mongoose = require('mongoose');

const base = {
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
};

const DocenteSchema = new mongoose.Schema(base, { timestamps: true });
const AlunoSchema = new mongoose.Schema(base, { timestamps: true });

module.exports = {
  Docente: mongoose.model('Docente', DocenteSchema),
  Aluno: mongoose.model('Aluno', AlunoSchema),
};
