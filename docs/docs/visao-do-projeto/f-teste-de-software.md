---
sidebar_label: "Teste de software"
sidebar_position: 5
---

# Teste de software

- **Propósito:** Este tópico descreve a estratégia, o escopo, os recursos e o cronograma das atividades de teste do projeto EcoNet. O objetivo é garantir que a plataforma web atenda aos requisitos funcionais e não funcionais definidos no Documento de Visão e no Documento de Arquitetura, assegurando uma experiência confiável, segura e eficiente para os usuários. A adoção de uma estratégia de testes sólida é fundamental para projetos ágeis e complexos, como ressaltado por Crispin e Gregory (2009), que destacam a importância da integração contínua de testes no ciclo de desenvolvimento ágil.

- **Objetivos do Teste:** Segundo Jorgensen (2013), o processo de teste de software deve validar o comportamento funcional conforme as especificações, identificar defeitos com antecedência e garantir qualidade contínua. Neste projeto, os objetivos são:
  - Validar funcionalidades de negócio, como cadastro de empresas, postagens de materiais e gerenciamento de contratos.
  - Identificar e relatar defeitos o mais cedo possível no ciclo SCRUM (Schwaber; Sutherland, 2020).
  - Assegurar a segurança e **manutenibilidade** por meio de análise estática contínua (SONARQUBE, 2025).
  - Verificar a usabilidade e consistência em navegadores modernos (JEST, 2025).
  - Assegurar que a integração entre o Frontend (React), o Backend (Node.js) e o Banco de Dados (MySQL) é robusta e livre de erros.

## Escopo dos Testes

- Com base em Kaner et al. (1999), o teste deve cobrir funcionalidades críticas do sistema. Serão testados os seguintes módulos:
  - **Autenticação:** Cadastro de pessoa física, login e recuperação de senha.
  - **Empresas:** Cadastro/edição de perfil e vinculação de usuários com cargos distintos.
  - **Conteúdo:** Criação, edição e exclusão de postagens; sistema de busca e filtros.
  - **Interação:** Funcionalidade de seguir empresas e chat para comunicação.
  - **Contratos:** Armazenamento e gestão de contratos firmados entre empresas.

## Estratégia de Testes

- A estratégia combina análise estática com a pirâmide de testes, conforme proposto por Fowler (2012), visando garantir cobertura desde a base do código até a interface final.
  - **Análise Estática de Código com Sonar:** A análise estática permite identificar bugs, vulnerabilidades e “code smells” automaticamente (SONARQUBE, 2025). A execução será feita no pipeline CI/CD, com correção dos problemas pelos desenvolvedores.
  - **Testes Unitários:** Base da pirâmide de testes, os testes unitários validam funções e componentes de forma isolada (JEST, 2025; CRISPIN; GREGORY, 2009). As ferramentas utilizadas serão Jest e React Testing Library.
  - **Testes de Integração:** Válida a comunicação entre partes do sistema, especialmente APIs (KANER et al., 1999). Serão utilizados **Supertest** e **Jest**.
  - **Testes de Sistema (End-to-End):** Validam fluxos de negócio completos do ponto de vista do usuário (CYPRESS, 2025). As ferramentas serão **Cypress** e **Playwright**.
  - **Testes de Regressão:** Um subconjunto dos testes anteriores será executado novamente antes de cada release para garantir que funcionalidades existentes não foram comprometidas.

## Critérios de Entrada e Saída

- **Critérios de Entrada:**
  - Código completo e testes unitários aprovados.
  - Aplicação implantada com sucesso no ambiente de testes.
  - Análise do Sonar sem bugs ou vulnerabilidades críticas.

- **Critérios de Saída:**
  - 100% dos casos de teste planejados executados.
  - Defeitos de prioridade alta e crítica corrigidos.
  - Qualidade aprovada no Quality Gate do Sonar (ex: cobertura de testes >= 80%).

## Ambientes de Teste

- De acordo com Crispin e Gregory (2009), a configuração do ambiente deve refletir o ambiente real de produção. Assim, o ambiente será composto por:

  - **Ferramentas de Qualidade:** SonarQube/SonarCloud (usadas integradas ao CI/CD).
  - **Testes de API:** Postman e Insomnia serão utilizados para testes exploratórios e manuais de endpoints (POSTMAN, 2023; INSOMNIA, 2025).
  - **Navegadores:** Últimas versões do Google Chrome, Mozilla Firefox e Microsoft Edge.

## Entregáveis de Teste e Cronograma

- **Entregáveis de Teste:** São as atividades que devem ser entregues no âmbito dos testes, segue a lista de entregáveis:

  - Casos de Teste registrados no GitHub Issues
  - Relatórios de execução e cobertura de testes (Jest)
  - Relatórios do Sonar (Quality Gate)
  - Relatórios de bugs com prioridades

- **Cronograma:** Baseado em Sprints semanais do SCRUM (SCHWABER; SUTHERLAND, 2020):
  - **Dia 1-2:** Levantamento dos requisitos e criação de casos de teste.
  - **Dia 3-4:** Execução de testes funcionais e de integração.
  - **Dia 5:** Testes de regressão e verificação do Quality Gate.

## Riscos e Mitigações

- No processo de garantia da qualidade do projeto EcoNet, a identificação e o gerenciamento de riscos são fundamentais para o sucesso das atividades de teste. A Tabela 22 apresenta os principais riscos previstos, suas probabilidades e impactos, bem como os planos de mitigação adotados para minimizá-los. As estratégias seguem as boas práticas propostas por Kaner, Falk e Nguyen (1999), que enfatizam a importância da análise contínua de riscos em testes para garantir a qualidade final do software. Além disso, a comunicação constante e a participação ativa da equipe em reuniões diárias (Dailys) e no planejamento das Sprints são estratégias essenciais para mitigar riscos relacionados à entrega e entendimento dos requisitos, alinhadas às práticas do SCRUM (Schwaber; Sutherland, 2020).

*Tabela 21: Riscos e Mitigações.*

| Risco | Probabilidade | Impacto | Plano de Mitigação |
|-------|--------------|---------|--------------------|
| Atraso na entrega das funcionalidades para teste. | Média | Alto | Acompanhamento diário (Dailys) com a equipe de desenvolvimento e comunicação constante. |
| "Quality Gate" do Sonar bloqueia o merge. | Média | Média | Alocar tempo no final da Sprint para que os desenvolvedores corrijam os problemas de código apontados pelo Sonar. |
| Requisitos de negócio ambíguos ou incompletos. | Média | Média | Participação ativa da equipe de testes nas reuniões de planejamento da Sprint (Planning) para tirar dúvidas. |

*Fonte: De autoria própria.*

---

## Referência
### Documento de visão do produto e do projeto
Para acessar a versão mais atual (v1.2.0) do documento de visão do produto e do projeto, consulte o pdf  
[Visão do Produto e do Projeto - EcoNet](../../static/files/visao-do-produto-e-do-projeto-algiz-2025.1.pdf)