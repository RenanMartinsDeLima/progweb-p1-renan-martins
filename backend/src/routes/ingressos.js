import { Router } from 'express';
import { ingressoController } from '../controllers/ingressoController.js';

const router = Router();

router.get('/', ingressoController.listar);
router.get('/:clienteId', ingressoController.listarPorCliente);
router.post('/', ingressoController.criar);
router.put('/:id', ingressoController.atualizar);
router.delete('/:id', ingressoController.remover);

export default router;

