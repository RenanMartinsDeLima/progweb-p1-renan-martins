import { DatabaseSync } from 'node:sqlite';

// O banco inteiro é um arquivo. Se não existir, o SQLite cria.
const arquivo = process.env.DB_FILE ?? 'banco.db';
export const db = new DatabaseSync(arquivo);

// No SQLite a checagem de chave estrangeira vem desligada.
// Tem de ligar a cada conexão.
db.exec('PRAGMA foreign_keys = ON;');

// O schema. IF NOT EXISTS: este arquivo roda toda vez que o servidor sobe.
db.exec(`
  CREATE TABLE IF NOT EXISTS clientes (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    nome  TEXT NOT NULL,
    cpf   TEXT NOT NULL UNIQUE,
    email TEXT
  );

  CREATE TABLE IF NOT EXISTS ingressos (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    status       INTEGER NOT NULL CHECK (status IN (0, 1)),
    assento      INTEGER NOT NULL,
    cliente_id INTEGER NOT NULL REFERENCES clientes(id)
  );
`);

// Dados de exemplo: só entram se o banco estiver vazio.
// No Render grátis o arquivo some a cada reinício; assim a demo nunca abre vazia.
const { total } = db.prepare('SELECT COUNT(*) AS total FROM clientes').get();
if (total === 0) {
  const r = db
    .prepare('INSERT INTO clientes (nome, cpf, email) VALUES (?, ?, ?)')
    .run('Ana Silva', '11122233344', 'ana@exemplo.com');
  db.prepare(`INSERT INTO ingressos (status, assento, cliente_id)
              VALUES (?, ?, ?)`)
    .run(1, 10, r.lastInsertRowid);
  const s = db
    .prepare('INSERT INTO clientes (nome, cpf, email) VALUES (?, ?, ?)')
    .run('Ze Maria', '55522233344');
  db.prepare(`INSERT INTO ingressos (status, assento, cliente_id)
              VALUES (?, ?, ?)`)
    .run(1, 33, s.lastInsertRowid);
}
