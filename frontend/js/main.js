// Ponto de entrada: liga store, service e view. Nenhuma regra mora aqui.
import { criarStore } from './state/store.js';
import { clienteService } from './services/clienteService.js';
import { clienteView } from './ui/clienteView.js';
import { ingressoService } from './services/ingressoService.js';
import { ingressoView } from './ui/ingressoView.js';
import { aviso } from './ui/aviso.js';

// ===================== CLIENTES =====================
const clientes = criarStore({
  status: 'carregando', // 'carregando' | 'erro' | 'vazio' | 'sucesso'
  clientes: [],
  erro: null,
  editandoId: null,
  salvando: false,
});

// Toda vez que o estado mudar, a view redesenha.
clientes.assinar(clienteView.render);

async function carregarClientes() {
  clientes.set({ status: 'carregando', erro: null });
  try {
    const lista = await clienteService.listar();
    clientes.set({ status: lista.length ? 'sucesso' : 'vazio', clientes: lista });
  } catch (e) {
    clientes.set({ status: 'erro', erro: e.message });
  }
}

async function salvarCliente(dados) {
  const { editandoId } = clientes.get();
  aviso.limpar();
  clientes.set({ salvando: true });
  try {
    if (editandoId) await clienteService.atualizar(editandoId, dados);
    else await clienteService.criar(dados);

    aviso.sucesso(editandoId ? 'Cliente atualizado.' : 'Cliente cadastrado.');
    clienteView.limparForm();
    clientes.set({ editandoId: null });
    await carregarClientes();
  } catch (e) {
    aviso.erro(e.message); // o formulário fica como está, para corrigir
  } finally {
    clientes.set({ salvando: false });
  }
}

function editarCliente(id) {
  const cliente = clientes.get().clientes.find((c) => c.id === id);
  clienteView.preencherForm(cliente);
  clientes.set({ editandoId: id });
}

function cancelarEdicaoCliente() {
  clienteView.limparForm();
  clientes.set({ editandoId: null });
}

async function removerCliente(id) {
  if (!confirm(`Remover o cliente #${id}?`)) return;
  aviso.limpar();
  try {
    await clienteService.remover(id);
    aviso.sucesso('Cliente removido.');
    if (clientes.get().editandoId === id) cancelarEdicaoCliente();
    await carregarClientes();
  } catch (e) {
    aviso.erro(e.message);
  }
}

clienteView.aoEnviar(salvarCliente);
clienteView.aoCancelar(cancelarEdicaoCliente);
clienteView.aoRecarregar(carregarClientes);
clienteView.aoClicarNaLista({ editar: editarCliente, remover: removerCliente });

// ===================== INGRESSOS =====================
const ingressos = criarStore({
  status: 'carregando',
  ingressos: [],
  erro: null,
  editandoId: null,
  salvando: false,
});

ingressos.assinar(ingressoView.render);

// As contas dependem dos clientes: mudou a lista de clientes,
// refaz o <select> e redesenha os nomes na tabela de contas.
clientes.assinar((estado) => {
  ingressoView.preencherClientes(estado.clientes);
  ingressoView.render(ingressos.get());
});

async function carregarIngressos() {
  ingressos.set({ status: 'carregando', erro: null });
  try {
    const lista = await ingressoService.listar();
    ingressos.set({ status: lista.length ? 'sucesso' : 'vazio', ingressos: lista });
  } catch (e) {
    ingressos.set({ status: 'erro', erro: e.message });
  }
}

async function salvarIngresso(dados) {
  const { editandoId } = ingressos.get();
  aviso.limpar();
  ingressos.set({ salvando: true });
  try {
    if (editandoId) await ingressoService.atualizar(editandoId, dados);
    else await ingressoService.criar(dados);

    aviso.sucesso(editandoId ? 'Ingresso atualizado.' : 'Ingresso aberto.');
    ingressoView.limparForm();
    ingressos.set({ editandoId: null });
    await carregarIngressos();
  } catch (e) {
    aviso.erro(e.message);
  } finally {
    ingressos.set({ salvando: false });
  }
}

function editarIngresso(id) {
  const ingresso = ingressos.get().ingressos.find((c) => c.id === id);
  ingressoView.preencherForm(ingresso);
  ingressos.set({ editandoId: id });
}

function cancelarEdicaoIngresso() {
  ingressoView.limparForm();
  ingressos.set({ editandoId: null });
}

async function removerIngresso(id) {
  if (!confirm(`Remover o ingresso #${id}?`)) return;
  aviso.limpar();
  try {
    await ingressoService.remover(id);
    aviso.sucesso('Ingresso removida.');
    if (ingressos.get().editandoId === id) cancelarEdicaoIngresso();
    await carregarIngressos();
  } catch (e) {
    aviso.erro(e.message);
  }
}

ingressoView.aoEnviar(salvarIngresso);
ingressoView.aoCancelar(cancelarEdicaoIngresso);
ingressoView.aoRecarregar(carregarIngressos);
ingressoView.aoClicarNaLista({ editar: editarIngresso, remover: removerIngresso });

// ===================== INÍCIO =====================
carregarClientes();
carregarIngressos();

