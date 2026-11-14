import { api } from '../api.js';

// const TIPOS = ['corrente', 'poupanca'];

function preparar({ /*tipo, saldo,*/assento, clienteId }) {
  if (!clienteId) throw new Error('Selecione o cliente.');
  // if (!TIPOS.includes(tipo)) throw new Error('Tipo de conta inválido.');
  // if (saldo === '' || Number.isNaN(Number(saldo))) {
  //   throw new Error('Informe o saldo em números.');
  // }
  if (assento === '' || Number.isNaN(Number(assento))) {
    throw new Error('Informe o assento em números.');
  }
  // Formulário só entrega string: convertemos antes de enviar
  return { /*tipo, saldo: Number(saldo),*/ assento: Number(assento), clienteId: Number(clienteId) };
}

export const ingressoService = {
  listar() {
    return api.get('/ingressos');
  },

  async criar(dados) {
    return api.post('/ingressos', preparar(dados));
  },

  async atualizar(id, dados) {
    return api.put(`/ingressos/${id}`, preparar(dados));
  },

  remover(id) {
    return api.delete(`/ingressos/${id}`);
  },
};
