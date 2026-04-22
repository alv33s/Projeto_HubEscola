const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE usuarios (id INTEGER PRIMARY KEY, login TEXT UNIQUE, senha TEXT)");
  db.run("CREATE TABLE escolas (id INTEGER PRIMARY KEY, nome TEXT, local TEXT)");
  
  // Cria o admin padrão com senha criptografada
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync('1234', salt);
  db.run("INSERT INTO usuarios (login, senha) VALUES ('admin', ?)", [hash]);
});

module.exports = db;