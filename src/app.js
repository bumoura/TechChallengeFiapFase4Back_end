const express = require('express');
const cors = require('cors');

const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');
const docentesRouter = require('./routes/docentes');
const alunosRouter = require('./routes/alunos');

const app = express();

// Middlewares **antes** das rotas:
app.use(cors());
app.use(express.json());


// (opcional) tratamento elegante de JSON inválido:
app.use((err, req, res, next) => {
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'JSON inválido no corpo da requisição' });
  }
  next(err);
});

// Rotas
app.use('/posts', postsRouter);
app.use('/auth', require('./routes/auth'));
app.use('/docentes', require('./routes/docentes'));
app.use('/alunos', require('./routes/alunos'));


app.get('/', (req, res) => {res.send('API Blog Fiap - online!');});
module.exports = app;