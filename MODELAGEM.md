# Modelagem — Projeto 1

**Aluno(a):** Renan Martins de Lima
**Domínio:** Controle de sessões de um cinema

## 1. O domínio

O cinema exibe filmes em sessões programadas em diferentes salas. Cada sessão possui um horário e um preço. Os clientes podem comprar ingressos para assistir a uma sessão, escolhendo um assento. Um assento não pode ter mais de um ingresso ativo na mesma sessão.

## 2. Entidades

| Entidade | Atributos | Relacionamentos |
| --- | --- | --- |
| Filme | id, titulo, duracaoMinutos, classificacaoIndicativa | aparece em várias sessões |
| Sala | id, numero, capacidade | recebe várias sessões |
| Sessao | id, filmeId, salaId, dataHora, preco | pertence a um filme e a uma sala; possui vários ingressos |
| Cliente | id, nome, email | compra vários ingressos |
| Ingresso | id, sessaoId, clienteId, assento, status | pertence a uma sessão e a um cliente |

## 3. Diagrama de classes

mermaid
```
classDiagram
  direction LR

  class Filme {
    +id
    +titulo
    +duracaoMinutos
    +classificacaoIndicativa
    +estaEmCartaz()
  }

  class Sala {
    +id
    +numero
    +capacidade
    +temAssentosDisponiveis()
  }

  class Sessao {
    +id
    +filmeId
    +salaId
    +dataHora
    +preco
    +estaDisponivel(hoje)
  }

  class Cliente {
    +id
    +nome
    +email
  }

  class Ingresso {
    +id
    +sessaoId
    +clienteId
    +assento
    +status
    +confirmar()
    +cancelar()
  }

  class IngressoService {
    +comprar(sessaoId, clienteId, assento)
    +cancelar(ingressoId)
    +listarPorCliente(clienteId)
  }

  class FilmeRepository {
    <<contrato>>
    +buscarPorId(id)
    +listar()
    +salvar(filme)
  }

  class SalaRepository {
    <<contrato>>
    +buscarPorId(id)
    +salvar(sala)
  }

  class SessaoRepository {
    <<contrato>>
    +buscarPorId(id)
    +listarPorFilme(filmeId)
    +salvar(sessao)
  }

  class ClienteRepository {
    <<contrato>>
    +buscarPorId(id)
    +salvar(cliente)
  }

  class IngressoRepository {
    <<contrato>>
    +buscarPorId(id)
    +listarPorCliente(clienteId)
    +existeIngressoAtivo(sessaoId, assento)
    +salvar(ingresso)
  }

  class Notificador {
    <<contrato>>
    +enviar(destinatario, mensagem)
  }

  Filme "1" --> "0..*" Sessao : aparece em
  Sala "1" --> "0..*" Sessao : recebe
  Sessao "1" --> "0..*" Ingresso : possui
  Cliente "1" --> "0..*" Ingresso : compra

  IngressoService ..> FilmeRepository : usa
  IngressoService ..> SalaRepository : usa
  IngressoService ..> SessaoRepository : usa
  IngressoService ..> ClienteRepository : usa
  IngressoService ..> IngressoRepository : usa
  IngressoService ..> Notificador : usa
```

## 4. Responsabilidades

| Classe | Papel | Único motivo para mudar |
| --- | --- | --- |
| Filme, Sala, Sessao, Cliente, Ingresso | entidades | Mudança nas regras ou características do próprio objeto |
| IngressoService | regra de negócio | Mudança no processo de compra e cancelamento de ingressos |
| FilmeRepository, SalaRepository, SessaoRepository, ClienteRepository, IngressoRepository | acesso aos dados | Mudança na forma de armazenar ou consultar os dados |
| Notificador | comunicação | Mudança no canal de notificação, como e-mail ou SMS |

## 5. Onde apliquei SRP e DIP

- SRP (Princípio da Responsabilidade Única): nenhuma entidade salva seus próprios dados ou envia notificações. Os repositórios cuidam do acesso aos dados, o `Notificador` cuida da comunicação e o `IngressoService` coordena as regras de compra e cancelamento.
- DIP (Princípio da Inversão de Dependência): o `IngressoService` depende dos contratos dos repositórios e do `Notificador`, recebidos pelo construtor. Ele não precisa saber se os dados estão armazenados em memória ou em um banco de dados, nem como as notificações são enviadas.

## 6. Fora do escopo (YAGNI)

Login, programas de fidelidade, descontos promocionais, venda de alimentos, reservas temporárias de assentos e relatórios financeiros não entram no Projeto 1.