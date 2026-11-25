// import { get } from "node:http";

// Camada de UI das contas. Mesmo molde da clienteView, com um <select> a mais.
const el = {
  form: document.querySelector('#form-ingresso'),
  cliente: document.querySelector('#ingresso-cliente'),
  salvar: document.querySelector('#ingresso-salvar'),
  cancelar: document.querySelector('#ingresso-cancelar'),
  carregando: document.querySelector('#ingresso-carregando'),
  erro: document.querySelector('#ingresso-erro'),
  erroMsg: document.querySelector('#ingresso-erro-msg'),
  recarregar: document.querySelector('#ingresso-recarregar'),
  vazio: document.querySelector('#ingresso-vazio'),
  sucesso: document.querySelector('#ingresso-sucesso'),
  linhas: document.querySelector('#ingresso-linhas'),
};

// const reais = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
// const NOME_TIPO = { corrente: 'Corrente', poupanca: 'Poupança' };

// id → nome, para mostrar o dono da conta sem outra requisição
let nomeDoCliente = new Map();

function celula(texto, classe = '') {
  const td = document.createElement('td');
  td.textContent = texto;
  td.className = classe;
  return td;
}

function botao(texto, acao, id, classe) {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = texto;
  b.className = `btn btn-sm ${classe}`;
  b.dataset.acao = acao;
  b.dataset.id = id;
  return b;
}

function linha(ingresso, editandoId) {
  const tr = document.createElement('tr');
  if (ingresso.id === editandoId) tr.className = 'editando';

  const dono = nomeDoCliente.get(String(ingresso.clienteId))
    ?? `cliente #${ingresso.clienteId} (removido)`; // conta órfã: assunto da S5

//   const cadeira = ingresso.assento;

  const acoes = celula('', 'text-end text-nowrap');
  acoes.append(
    botao('Editar', 'editar', ingresso.id, 'btn-outline-primary me-1'),
    botao('Remover', 'remover', ingresso.id, 'btn-outline-danger'),
  );

  tr.append(
    celula(ingresso.id),
    celula(dono),
    // celula(NOME_TIPO[ingresso.tipo] ?? ingresso.tipo),
    celula(ingresso.assento),
    celula(ingresso.status),
    acoes,
  );
  return tr;
}

export const ingressoView = {
  // Preenche o <select> com os clientes que existem agora
  preencherClientes(clientes) {
    nomeDoCliente = new Map(clientes.map((c) => [String(c.id), c.nome]));
    const escolhido = el.cliente.value;

    const opcoes = clientes.map((c) => new Option(`${c.nome} (#${c.id})`, c.id));
    el.cliente.replaceChildren(new Option('Selecione…', ''), ...opcoes);

    // mantém a escolha, se o cliente ainda existir
    if (nomeDoCliente.has(Number(escolhido))) el.cliente.value = escolhido;
  },

  render({ status, ingressos, erro, editandoId, salvando }) {
    el.carregando.classList.toggle('d-none', status !== 'carregando');
    el.erro.classList.toggle('d-none', status !== 'erro');
    el.vazio.classList.toggle('d-none', status !== 'vazio');
    el.sucesso.classList.toggle('d-none', status !== 'sucesso');

    el.erroMsg.textContent = erro ?? '';
    el.linhas.replaceChildren(...ingressos.map((c) => linha(c, editandoId)));

    el.salvar.disabled = salvando;
    el.salvar.textContent = salvando
      ? 'Salvando…'
      : editandoId ? 'Salvar alterações' : 'Adicionar ingresso';
    el.cancelar.classList.toggle('d-none', !editandoId);
  },

  preencherForm(ingresso) {
    el.form.clienteId.value = ingresso.clienteId;
    // el.form.tipo.value = ingresso.tipo;
    el.form.assento.value = ingresso.assento;
    el.form.status.value = ingresso.status;
    el.form.assento.focus();
  },

  limparForm() {
    el.form.reset();
  },

  aoEnviar(fn) {
    el.form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      fn(Object.fromEntries(new FormData(el.form)));
    });
  },

  aoCancelar(fn) {
    el.cancelar.addEventListener('click', fn);
  },

  aoRecarregar(fn) {
    el.recarregar.addEventListener('click', fn);
  },

  aoClicarNaLista({ editar, remover }) {
    el.linhas.addEventListener('click', (evento) => {
      const alvo = evento.target.closest('button[data-acao]');
      if (!alvo) return;
      const id = Number(alvo.dataset.id);
      if (alvo.dataset.acao === 'editar') editar(id);
      if (alvo.dataset.acao === 'remover') remover(id);
    });
  },
};
