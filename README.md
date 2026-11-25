# Sistema de controle de um cinema

O sistema cadastra clientes e ingressos para um cinema.
Projeto 1 da disciplina Programação Web (UEPB, 2026.2).

- **Aplicação:** https://SEU-FRONT.vercel.app
- **API:** https://SEU-SERVICO.onrender.com
- **Vídeo de apresentação:** (link)

> A API está no plano grátis do Render: o primeiro acesso pode levar cerca de
> um minuto, e os dados voltam aos de exemplo a cada reinício do serviço.

## Tecnologias

- Backend: Node.js 22, Express 5, SQLite (`node:sqlite`, SQL puro)
- Frontend: HTML, CSS, Bootstrap 5, JavaScript puro (ES Modules, `fetch`)

## Como rodar localmente

Pré-requisito: Node.js 22 ou superior.

```bash
# 1. API
cd backend
npm install
cp .env.example .env
npm run dev                      # http://localhost:3000

# 2. Frontend (em outro terminal)
cd frontend
npx http-server -p 5500 -c-1     # http://localhost:5500
```

## Rotas da API

| Método | Rota | O que faz | Respostas |
|---|---|---|---|
| GET | /clientes | Lista os clientes | 200 |
| POST | /clientes | Cria um cliente | 201, 400, 409 |
| GET | /clientes/:id | Busca um cliente | 200, 404 |
| PUT | /clientes/:id | Atualiza um cliente | 200, 404 |
| DELETE | /clientes/:id | Remove um cliente | 204, 404, 409 |
| GET | /ingressos | Lista os ingressos | 200 |
| POST | /ingressos | Cria um ingresso | 201, 400, 409 |
| GET | /ingressos/:clienteId | Busca todos ingressos de um cliente | 200, 404 |
| PUT | /ingressos/:id | Atualiza um ingresso | 200, 404 |
| DELETE | /ingressos/:id | Remove um ingresso | 204, 404, 409 |
| ... | ... | ... | ... |

Erros seguem o formato `{ "erro": "mensagem" }`.

## Regras de negócio

- (uma linha por regra: o que é validado e qual status devolve)
- Regra 1: { valida: nome e cpf são obrigatórios, devolve: 400 }
- Regra 2: { valida: cpf é único, devolve: 409 }
- Regra 3: { valida: excluindo cliente com ingressos, devolve: 409 }
- Regra 4: { valida: ingresso para cliente que não existe, devolve: 422 }
- Regra 5: { valida: assento fora do intervalo, devolve: 400 }
- Regra 6: { valida: assento já reservado, devolve: 409 }

## Estrutura

```
backend/
  src/
    routes/        mapeia URL → controller
    controllers/   lê a requisição, chama o service, responde
    services/      regras de negócio
    models/        acesso ao banco (SQL)
    middleware/    logger e tratamento de erros
    db.js          conexão e schema do SQLite
frontend/
  js/
    api.js         camada HTTP (fetch)
    services/      regras da tela
    state/         estado da aplicação
    ui/            desenho da tela
MODELAGEM.md       modelagem de classes (S2)
s1/ … s4/          exercícios das semanas
```

## Autor

Renan Martins de Lima · Ciência da Computação · UEPB