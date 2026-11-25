// "Banco de dados" em memória: um array. Na S5 vira SQLite.
import { db } from '../db.js';

// Mesmo contrato da S3 (listar, buscarPorId, existeCpf, inserir,
// atualizar, remover). Só o "como" mudou: o array virou tabela.
const COLUNAS = 'id, status, assento, cliente_id AS clienteId';
export const ingressoModel = {
  listar() {
    return db.prepare(`SELECT ${COLUNAS} FROM ingressos ORDER BY id`).all();
  },

  buscarPorId(id) {
    return db.prepare(`SELECT ${COLUNAS} FROM ingressos WHERE id = ?`).get(id) ?? null;
  },
  
  listarPorCliente(clienteId) {
    return db.prepare(`SELECT ${COLUNAS} FROM ingressos WHERE cliente_id = ?`).all(clienteId) ?? null;
  },

  assentoDisponivel(assento) {
    const linha = db.prepare('SELECT 1 FROM ingressos WHERE assento = ?').get(assento);
    return linha !== undefined;
  },

  inserir({ status, assento, clienteId }) {
    const r = db
      .prepare('INSERT INTO ingressos (status, assento, cliente_id) VALUES (?, ?, ?)')
      .run(status ?? 1, assento, clienteId);
    return this.buscarPorId(r.lastInsertRowid);
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) return null;
    const novo = { ...atual, ...dados };
    db.prepare('UPDATE ingressos SET status = ?, assento = ? WHERE id = ?')
      .run(novo.status ?? 1, novo.assento, id); // o id nunca muda
    return this.buscarPorId(id);
  },

  remover(id) {
    const r = db.prepare('DELETE FROM ingressos WHERE id = ?').run(id);
    return r.changes > 0; // true = removeu
  },
};
