import { api } from '../api.js';

// const TIPOS = ['corrente', 'poupanca'];

function preparar({ status, assento, clienteId }) {
  const dados = {
    assento: (assento ?? ''),
    status: 1,
    clienteId: (clienteId ?? ''),
  };
  if (!dados.clienteId) throw new Error('Selecione o cliente.');
  // if (!TIPOS.includes(tipo)) throw new Error('Tipo de conta inválido.');
  // if (saldo === '' || Number.isNaN(Number(saldo))) {
  //   throw new Error('Informe o saldo em números.');
  // }
  if (dados.assento === '' || Number.isNaN(Number(assento))) {
    throw new Error('Informe o assento em números.');
  }
  // if (!dados.status) throw new Error('Informe o status em números.');
  
  // Formulário só entrega string: convertemos antes de enviar
  return dados;
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
