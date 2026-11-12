# Testes da API — Projeto 1 (S3)

API: Cinema · entidades: Cliente e Ingresso · servidor: `npm run dev` em http://localhost:3000

| # | Método | URL | Body | Status obtido | Observação |
|---|---|---|---|---|---|
| 1 | POST | /clientes | {"nome":"João Grilo","cpf":"123.456.789-00"} | 201 | |
| 2 | POST | /ingressos | {"assento":10,"clienteId":1} | 201 | |
| 3 | GET | /ingressos?clienteId=1 | — | 200 | filtro 1:N |
| 4 | GET | /ingressos/99 | — | 404 | |
| 5 | POST | /ingressos | {"assento":10,"clienteId":1} | 409 | regra: assento != ocupado |
| 6 | POST | /ingressos | {"assento":10,"clienteId":999} | 422 | cliente não existe |
| 7 | DELETE | /clientes/1 | — | 204 | |
