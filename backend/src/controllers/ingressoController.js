import { ingressoService } from '../services/ingressoService.js';

export const ingressoController = {
  listar(req, res) {
    res.json(ingressoService.listar());
  },

  listarPorCliente(req, res) {
    res.json(ingressoService.listarPorCliente(Number(req.params.clienteId)));
  },

  criar(req, res) {
    const novo = ingressoService.criar(req.body);
    res.status(201).json(novo);
  },

  atualizar(req, res) {
    res.json(ingressoService.atualizar(Number(req.params.id), req.body));
  },

  remover(req, res) {
    ingressoService.remover(Number(req.params.id));
    res.status(204).end();
  },
};
