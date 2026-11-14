import { clienteModel } from "../models/clienteModel.js"
import { ingressoModel } from "../models/ingressoModel.js";
import { erro } from "../utils/erro.js";

export const ingressoService = {
  listar() {
    return ingressoModel.listar();
  },

  listarPorCliente(clienteId) {
    const ingresso = ingressoModel.listarPorCliente(clienteId);
    if (!ingresso) throw erro(404, "Ingresso não encontrado");
    return ingresso;
  },

  criar({ clienteId, assento } = {}) {
    // Regra 1: cliente deve existir
    if (!clienteModel.buscarPorId(clienteId))
      throw erro(422, 'Cliente não existe');
    // Regra 2: assento escolhido não pode estar ocupado
    if (ingressoModel.assentoDisponivel(assento))
      throw erro(409, `Alguém já reservou o assento ${assento}`);
    return ingressoModel.inserir({ clienteId, assento });
  },

  atualizar(id, dados = {}) {
    const atualizado = ingressoModel.atualizar(id, dados);
    if (!atualizado) throw erro(404, "Cliente não encontrado");
    return atualizado;
  },

  remover(id) {
    const removido = ingressoModel.remover(id);
    if (!removido) throw erro(404, "Cliente não encontrado");
  },
};
