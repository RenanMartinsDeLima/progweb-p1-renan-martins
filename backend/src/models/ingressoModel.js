// "Banco de dados" em memória: um array. Na S5 vira SQLite.
let ingressos = [];
let proximoId = 1;

export const ingressoModel = {
  listar() {
    return ingressos;
  },

  listarPorCliente(clienteId) {
    return ingressos.filter((ingresso) => ingresso.clienteId === clienteId) ?? null;
  },

  assentoDisponivel(assento) {
    return ingressos.some((ingresso) => ingresso.assento === assento);
  },

  inserir({ clienteId, assento }) {
    const novo = { id: proximoId++, clienteId, assento: assento ?? null, status: true };
    ingressos.push(novo);
    return novo;
  },

  atualizar(id, dados) {
    const i = ingressos.findIndex((ingresso) => ingresso.id === id);
    if (i === -1) return null;
    ingressos[i] = { ...ingressos[i], ...dados, id }; // o id nunca muda
    return ingressos[i];
  },

  remover(id) {
    const antes = ingressos.length;
    ingressos = ingressos.filter((ingresso) => ingresso.id !== id);
    return ingressos.length < antes; // true = removeu
  },
};
