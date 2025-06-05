---
sidebar_label: "Representação arquitetural"
sidebar_position: 2
---
# Representação arquitetural

## Definições

O sistema seguirá a arquitetura SCRUM, onde nosso processo de desenvolvimento vai ocorrer através de sprints, com uma semana de duração cada, possibilitando flexibilidade, desenvolvimento ágil, adaptação contínua e uma entrega incremental. (Visitar tópico 2 - Visão Geral Do Produto no documento de visão para msi detalhes)


## Justifique sua Escolha

A metodologia SCRUM foi escolhida baseada na quantidade de pessoas e demanda do projeto, tendo em vista que será necessário mudanças ao decorrer do projeto e uma entrega incremental semanal, escolhemos uma metodologia com uma grande flexibilidade e que consegue atender a todos os integrantes. Isso garante a atribuição de trabalho, acompanhamento do progresso do projeto (Sprints e Dailys) e a flexibilidade desse método.

## Detalhamento

Para a construção do EcoNet, optamos por adotar uma abordagem que une um processo de desenvolvimento ágil, fundamentado na metodologia SCRUM, a uma estrutura técnica organizada em camadas N = 3(apresentação, negócio e persistência). Essa combinação garante que o projeto evolua de forma incremental e flexível, acompanhando as mudanças nos requisitos e facilitando a atribuição de tarefas, testes e entregas contínuas.

### Organização por Sprints e Flexibilidade:

- **Sprints Semanais:**
 O desenvolvimento ocorre em ciclos de 1 semana (sprints), permitindo que entregas parciais do sistema sejam avaliadas, revisadas e refinadas com base nos feedbacks recebidos. Esse ciclo curto possibilita uma resposta rápida a eventuais mudanças ou ajustes necessários, mantendo o projeto alinhado às expectativas e necessidades do produto. 
- **Atribuição de Tarefas:**
 Cada sprint tem objetivos bem definidos, com tarefas atribuídas a cada membro da equipe de acordo com suas competências. Isso torna o trabalho mais organizado, permitindo que os desenvolvedores se concentrem em partes específicas da aplicação, seja na elaboração de componentes da camada de apresentação, na definição da lógica de negócios ou na implementação dos mecanismos de persistência.

### Integração com a Estrutura Técnica do EcoNet:

**Arquitetura em Camadas:**

 Embora o SCRUM regule o processo, a implementação do EcoNet está estruturada em três camadas principais:

- **Camada de Apresentação:** Responsável pela interface e pela interação com o usuário, garantindo que todas as entradas e saídas sejam devidamente tratadas.

- **Camada de Negócio:** Focaliza a implementação das regras, validações e operações, como o processamento dos dados e fluxos internos do sistema.

- **Camada de Persistência:** Cuida do armazenamento, recuperação e gerenciamento dos dados, interagindo com o banco de dados (MySQL).
Essa divisão modular facilita a manutenção e os testes independentes de cada componente, o que se alinha perfeitamente com a filosofia de entregas incrementais do SCRUM.
### Ferramentas e Comunicação:
- **Colaboração e Feedback Contínuo:**
 Utilizamos ferramentas como o Microsoft Teams para reuniões diárias e revisão semanal do progresso (dailys, planning, review e retrospective). Isso possibilita um fluxo constante de feedback, essencial para que cada sprint seja ajustado de acordo com os desafios encontrados, assegurando a consistência e a evolução técnica do sistema.

 ### Representação Visual da Arquitetura:

 ![Representação Visual da Arquitetura](../../static/img/image6.png)

