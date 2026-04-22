const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./database');
const path = require('path');
const { validarDadosEscola, validarSenha } = require('./utils');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Registro de Usuário
app.post('/api/registrar', (req, res) => {
  const { login, senha } = req.body;
  if (!validarSenha(senha)) {
    return res.status(400).json({ sucesso: false, mensagem: 'Senha deve ter no mínimo 4 caracteres' });
  }

  db.get("SELECT * FROM usuarios WHERE login = ?", [login], (err, row) => {
    if (row) return res.status(400).json({ sucesso: false, mensagem: 'Usuário já existe' });
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);
    
    db.run("INSERT INTO usuarios (login, senha) VALUES (?, ?)", [login, hash], function(err) {
      if (err) return res.status(500).send(err.message);
      res.status(201).json({ sucesso: true, mensagem: 'Usuário registrado com sucesso!' });
    });
  });
});

// Login Seguro
app.post('/api/login', (req, res) => {
  const { login, senha } = req.body;
  db.get("SELECT * FROM usuarios WHERE login = ?", [login], (err, row) => {
    if (!row) return res.status(401).json({ sucesso: false, mensagem: 'Usuário não encontrado' });
    
    const senhaValida = bcrypt.compareSync(senha, row.senha);
    if (senhaValida) res.json({ sucesso: true, mensagem: 'Login efetuado' });
    else res.status(401).json({ sucesso: false, mensagem: 'Senha incorreta' });
  });
});

// CRUD: Create
app.post('/api/escolas', (req, res) => {
  const { nome, local } = req.body;
  if (!validarDadosEscola(nome, local)) return res.status(400).json({ erro: 'Dados inválidos' });
  db.run("INSERT INTO escolas (nome, local) VALUES (?, ?)", [nome, local], function(err) {
    if (err) return res.status(500).send(err.message);
    res.status(201).json({ id: this.lastID, nome, local });
  });
});

// CRUD: Read
app.get('/api/escolas', (req, res) => {
  db.all("SELECT * FROM escolas", [], (err, rows) => {
    res.json(rows);
  });
});

// CRUD: Update
app.put('/api/escolas/:id', (req, res) => {
  const { nome, local } = req.body;
  if (!validarDadosEscola(nome, local)) return res.status(400).json({ erro: 'Dados inválidos' });
  db.run("UPDATE escolas SET nome = ?, local = ? WHERE id = ?", [nome, local, req.params.id], function() {
    res.json({ atualizado: this.changes });
  });
});

// CRUD: Delete
app.delete('/api/escolas/:id', (req, res) => {
  db.run("DELETE FROM escolas WHERE id = ?", [req.params.id], function() {
    res.json({ deletado: this.changes });
  });
});

if (require.main === module) {
  app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
}
module.exports = app;