---
sidebar_label: "Representação arquitetural"
sidebar_position: 2
---

# Representação Arquitetural

## Definições

O sistema seguirá a arquitetura MVC (Modelo, Visão, Controller), que é amplamente utilizada em frameworks de sucesso por promover uma clara separação de responsabilidades. No padrão MVC, o **Modelo** gerencia os dados e as regras de negócio, a **Visão** é responsável pela interface com o usuário, e o **Controller** atua como intermediário, interpretando as entradas do usuário e coordenando as interações entre as camadas.

Adicionalmente, a escolha pelo estilo arquitetural N-Camadas, com N = 3, reforça essa divisão estrutural do sistema em três níveis principais:

- **Camada de Apresentação**: Responsável por exibir a interface e interagir com o usuário, integrando os aspectos visuais e de usabilidade.
- **Camada de Negócio**: Onde as regras, a lógica de validação e o processamento dos dados são definidos, garantindo que a aplicação cumpra seus propósitos funcionais.
- **Camada de Persistência**: Dedicada ao acesso, armazenamento e recuperação dos dados, assegurando a integridade e a persistência das informações.

Essa abordagem modular não apenas facilita a manutenção e a escalabilidade do sistema, como também permite que equipes trabalhem de forma paralela em diferentes camadas, reduzindo o acoplamento e aumentando a coesão. A representação arquitetural pode ser complementada por diagramas UML (como diagramas de componentes e de classes) que auxiliam na visualização e na comunicação das decisões de design junto aos stakeholders.

## Justifique sua escolha

A utilização da arquitetura MVC combinada com o estilo N-Camadas (com N = 3) é justificada pela sua capacidade de promover uma clara separação de responsabilidades dentro do sistema. Essa divisão em camadas — Apresentação, Negócio e Persistência(Dados) — facilita a manutenção, a escalabilidade e a evolução do software, pois permite que alterações em uma camada possam ser realizadas sem impactos diretos nas demais. Além disso, a separação entre o Modelo, a Visão e o Controller (no padrão MVC) garante que a lógica de negócios, a interface com o usuário e o controle das interações fiquem isolados, otimizando a organização do código e favorecendo o trabalho colaborativo entre equipes especializadas. Assim, essa abordagem modular melhora a eficiência do desenvolvimento e a adaptabilidade do sistema às mudanças.

## Detalhamento

Para o EcoNet, combinamos SCRUM (gestão ágil), MVC (organização do código) e uma arquitetura em 3 camadas (apresentação, negócio e persistência). Essa abordagem garante desenvolvimento iterativo, código modular e fácil manutenção, com entregas alinhadas aos requisitos evolutivos do projeto.

### Organização por Sprints e Flexibilidade:

- **Sprints Semanais:**  
  O desenvolvimento ocorre em ciclos de 1 semana (sprints), permitindo que entregas parciais do sistema sejam avaliadas, revisadas e refinadas com base nos feedbacks recebidos. Esse ciclo curto possibilita uma resposta rápida a eventuais mudanças ou ajustes necessários, mantendo o projeto alinhado às expectativas e necessidades do produto. 

- **Atribuição de Tarefas:**  
  Cada sprint tem objetivos bem definidos, com tarefas atribuídas a cada membro da equipe de acordo com suas competências. Isso torna o trabalho mais organizado, permitindo que os desenvolvedores se concentrem em partes específicas da aplicação, seja na elaboração de componentes da camada de apresentação, na definição da lógica de negócios ou na implementação dos mecanismos de persistência.

### Integração com a Estrutura Técnica do EcoNet:

**Arquitetura em Camadas:**  
Embora o SCRUM regule o processo, a implementação do EcoNet está estruturada em três camadas principais:

- **Camada de Apresentação:**   
  Responsável pela interface e pela interação com o usuário, garantindo que todas as entradas e saídas sejam devidamente tratadas.

- **Camada de Negócio:**   
  Focaliza a implementação das regras, validações e operações, como o processamento dos dados e fluxos internos do sistema.

- **Camada de Persistência:**   
  Cuida do armazenamento, recuperação e gerenciamento dos dados, interagindo com o banco de dados (MySQL).

Essa divisão modular facilita a manutenção e os testes independentes de cada componente, o que se alinha perfeitamente com a filosofia de entregas incrementais do SCRUM.

### Ferramentas e Comunicação:

- **Colaboração e Feedback Contínuo:**  
  Utilizamos ferramentas como o Microsoft Teams para reuniões diárias e revisão semanal do progresso (dailys, planning, review e retrospective). Isso possibilita um fluxo constante de feedback, essencial para que cada sprint seja ajustado de acordo com os desafios encontrados, assegurando a consistência e a evolução técnica do sistema.

### Representação Visual da Arquitetura: 
Figura 1: Diagrama esquemático da representação arquitetural.
![Representação Visual da Arquitetura](../../static/img/figura%201.1.png)                             
Fonte: De autoria própria.

Foi elaborado um diagrama arquitetural que ilustra a divisão em camadas, os fluxos de dados e a comunicação entre os componentes (Figura 1). Portanto, nosso modelo arquitetural pode ser resumido como:

**"Uma arquitetura em 3 camadas (apresentação, negócio e persistência) integrada a um processo de desenvolvimento ágil via SCRUM"**.

Isso permite que cada sprint contribua para a evolução do sistema de forma incremental, com entregas parciais (e testáveis) que estão alinhadas à organização modular proposta, resultando em um sistema fácil de manter e adaptável às mudanças de requisitos.

Em resumo, a combinação do processo ágil proporcionado pelo SCRUM com uma arquitetura técnica em três camadas permite que o EcoNet se desenvolva de maneira organizada, flexível e adaptável. Cada sprint contribui incrementalmente para o produto final, refletindo ajustes constantes no design e na implementação, enquanto a divisão modular garante que os diversos componentes do sistema possam ser desenvolvidos, testados e mantidos com maior clareza e eficiência.

## Metas e restrições arquiteturais

Foram propostas algumas metas que visam assegurar que a solução atenda às expectativas de qualidade e confiabilidade desde sua implantação até futuras atualizações.
- O sistema deverá ser capaz de suportar pelo menos 10 acessos simultâneos de usuários, sem apresentar lentidão ou falhas.  
- O sistema deve ter vida útil prolongada, sendo capaz de evoluir tecnologicamente.  
- O site precisa ser responsivo, funcionando adequadamente em navegadores como, Google Chrome e Microsoft Edge.  
- O sistema deve funcionar em rede local.  
- O sistema deve ter criptografia de senhas.
