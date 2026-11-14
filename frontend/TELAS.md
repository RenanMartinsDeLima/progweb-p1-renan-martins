# Telas do Projeto 1 (S4)

Front: `npx http-server -p 5500 -c-1` em `frontend/` · API: `npm run dev` em `backend/`

| Lista | Estado | Como provocar | O que aparece |
|---|---|---|---|
| Clientes | carregando | Network → throttling 3G → F5 | spinner "Carregando clientes" |
| Clientes | vazio | API recém-iniciada | "Nenhum cliente ainda…" |
| Clientes | erro | Ctrl+C na API → F5 | "Não consegui falar com a API…" + Tentar de novo |
| Clientes | sucesso | cadastrar "Bebidas" | tabela com 1 linha |
| Ingressos | vazio | sem ingressos | "Nenhum ingresso ainda…" |
| Ingressos | erro de regra | assento N fora de range | aviso "Assento N fora do intervalo [1~50]" (400) |
| Ingressos | erro de regra | assento N ocupado | aviso "Alguém já reservou o assento N" (409) |

## Camadas
- api: `js/api.js` · services: `js/services/` · state: `js/state/store.js` · ui: `js/ui/`
