// "Banco de dados" em memória: um array. Na S5 vira SQLite.
let clientes = [];
let proximoId = 1;

export const clienteModel = {
  listar() {
    return clientes;
  },

  buscarPorId(id) {
    return clientes.find((cliente) => cliente.id === id) ?? null;
  },

  existeCpf(cpf) {
    return clientes.some((cliente) => cliente.cpf === cpf);
  },

  inserir({ nome, cpf, email }) {
    const novo = { id: proximoId++, nome, cpf, email: email ?? null };
    clientes.push(novo);
    return novo;
  },

  atualizar(id, dados) {
    const i = clientes.findIndex((cliente) => cliente.id === id);
    if (i === -1) return null;
    clientes[i] = { ...clientes[i], ...dados, id }; // o id nunca muda
    return clientes[i];
  },

  remover(id) {
    const antes = clientes.length;
    clientes = clientes.filter((cliente) => cliente.id !== id);
    return clientes.length < antes; // true = removeu
  },
};
