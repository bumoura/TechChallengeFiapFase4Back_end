// scripts/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');
const { Docente, Aluno } = require('../src/models/People');

const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017/blog';

async function run() {
  await mongoose.connect(MONGO_URI);
  await User.deleteMany({});
  await Docente.deleteMany({});
  await Aluno.deleteMany({});

  const passProf = await bcrypt.hash('prof123', 10);
  const passAluno = await bcrypt.hash('aluno123', 10);

  await User.create({ name: 'Prof. Bruna', email: 'prof@fiap.com', passwordHash: passProf, role: 'professor' });
  await User.create({ name: 'Aluno Demo', email: 'aluno@fiap.com', passwordHash: passAluno, role: 'aluno' });

  await Docente.insertMany([
    { nome: 'Gustavo Oliveira', email: 'gustavo@fiap.com' },
    { nome: 'Carla Souza', email: 'carla@fiap.com' }
  ]);

  await Aluno.insertMany([
    { nome: 'João Silva', email: 'joao@fiap.com' },
    { nome: 'Maria Santos', email: 'maria@fiap.com' }
  ]);

  console.log('Seed concluído.');
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
