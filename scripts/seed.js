require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Post = require('../src/models/Post');
const People = require('../src/models/People');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/blog';

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('🌱 Conectado ao MongoDB para Seed...');

    await User.deleteMany({});
    await Post.deleteMany({});
    await People.deleteMany({});

    console.log('👤 Criando usuários de acesso...');
    
    // PROFESSOR (ADMIN)
    await User.create({
      name: 'Professor Admin',
      email: 'prof@fiap.com',
      password: 'prof123',
      role: 'professor'
    });

    // ALUNO (VISITANTE)
    await User.create({
      name: 'Aluno Visitante',
      email: 'aluno@fiap.com',
      password: 'aluno123',
      role: 'aluno'
    });

    console.log('📝 Criando registros de alunos e docentes...');
    
    await People.create([
      { nome: 'Carlos Silva', email: 'carlos.silva@fiap.com', type: 'aluno' },
      { nome: 'Beatriz Costa', email: 'bia.costa@fiap.com', type: 'aluno' },
      { nome: 'João Pedro', email: 'jp.souza@fiap.com', type: 'aluno' },
      { nome: 'Roberto Docente', email: 'roberto@fiap.com', type: 'docente' },
      { nome: 'Ana Professora', email: 'ana@fiap.com', type: 'docente' }
    ]);

    console.log('📰 Criando posts...');
    await Post.create([
      { title: 'Volta às Aulas', content: 'As aulas retornarão dia 05.', author: 'Secretaria' },
      { title: 'Hackathon FIAP', content: 'Inscreva-se no evento anual de tecnologia.', author: 'Coordenação' }
    ]);

    console.log('✅ Seed concluído com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro no seed:', error);
    process.exit(1);
  }
};

seed();