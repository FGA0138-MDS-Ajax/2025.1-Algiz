---
sidebar_label: "Declaração de escopo do projeto"
sidebar_position: 3
---

# Declaração de escopo do projeto

## Backlog do produto
- A Tabela 10 – Backlog do produto apresenta o conjunto de requisitos levantados e implementados ao longo das sprints do projeto. Esses requisitos foram organizados com base no símbolo #, que representa a numeração sequencial dos entregáveis, sendo cada linha da tabela um item funcional ou não funcional a ser entregue.
Cada linha inclui a identificação da sprint de origem, o nome resumido do requisito, sua classificação (funcional ou não funcional), o grau de prioridade conforme o modelo MoSCOW e uma descrição sucinta da funcionalidade. Além disso, cada requisito está vinculado a uma user story (história de usuário), que expressa de forma prática e empática a necessidade do usuário final.
A priorização seguiu o modelo MoSCoW, que define: 
  - **Must:** requisitos essenciais, cuja ausência inviabilizaria a operação do produto ou causaria sérios problemas.
  - **Should:** requisitos importantes, mas não indispensáveis na primeira versão; podem ser implementados em sprints subsequentes.
  - **Could:** requisitos desejáveis e que agregam valor, mas que podem ser adiados caso o tempo seja restrito.

*Tabela 10: Backlog do produto.*

| #  | Sprint    | Nome do requisito                          | Tipo de requisito  | Priorização | Descrição do requisito                                  | User stories (U.S.) associadas                                      |
|----|-----------|--------------------------------------------|--------------------|-------------|---------------------------------------------------------|--------------------------------------------------------------------|
| 01 | Sprint 01 | Layout de navegação (navbar Home Page)     | Funcional          | Must        | Permitir navegação entre as páginas principais do site. | Como usuário, quero acessar facilmente as páginas principais da aplicação. |
| 02 | Sprint 01 | Página de cadastro (Pessoa Física)         | Funcional          | Must        | Cadastro de pessoas físicas na plataforma.              | Como pessoa física, quero me cadastrar na plataforma para utilizar seus recursos. |
| 03 | Sprint 01 | Página de cadastro (Empresas)              | Funcional          | Must        | Cadastro de empresas no sistema.                        | Como empresa, quero me registrar para disponibilizar ou consumir materiais. |
| 04 | Sprint 02 | Página de Login                            | Funcional          | Must        | Permitir que usuários autenticados acessem o sistema.   | Como usuário, quero fazer login para acessar funcionalidades protegidas. |
| 05 | Sprint 02 | Criação do Banco de Dados                  | Não funcional      | Must        | Definir estrutura de dados e persistência da aplicação. | Como desenvolvedor, preciso estruturar o banco para persistência dos dados. |
| 06 | Sprint 02 | Protótipos no Figma                        | Não funcional      | Should      | Elaborar protótipos para orientar o desenvolvimento visual. | Como equipe, queremos visualizar as telas antes de codificar.      |
| 07 | Sprint 03 | Página Home (sem login)                    | Funcional          | Should      | Apresentar informações gerais da aplicação ao visitante. | Como visitante, quero visualizar informações básicas antes de me cadastrar. |
| 08 | Sprint 03 | Página Sobre Nós                           | Funcional          | Could       | Informações institucionais sobre a equipe e o projeto.   | Como visitante, quero conhecer a equipe por trás da aplicação.     |
| 09 | Sprint 03 | Documento de Arquitetura                   | Não funcional      | Must        | Definir a arquitetura geral do sistema para orientar o desenvolvimento. | Como equipe, precisamos de uma referência de arquitetura para manter padrão e qualidade. |
| 10 | Sprint 04 | Formulário de cadastro conectado ao backend | Funcional          | Must        | Integração entre front-end e back-end no cadastro de usuários. | Como usuário, quero que meu cadastro seja armazenado corretamente. |
| 11 | Sprint 04 | Página pública do usuário                  | Funcional          | Should      | Apresentar perfis públicos de usuários.                 | Como visitante, quero visualizar informações públicas de outros usuários. |
| 12 | Sprint 04 | Ata de reunião 04/06                       | Não funcional      | Could       | Registro de decisões e tarefas discutidas na reunião de 04/06. | Como equipe, queremos registrar nossas decisões para futuras referências. |
| 13 | Sprint 04 | Documento de Arquitetura no GitHub Pages   | Não funcional      | Must        | Publicar o documento técnico no repositório.            | Como equipe, queremos facilitar o acesso à documentação pelo GitHub Pages. |
| 14 | Sprint 05 | Página Home pública                        | Funcional          | Must        | Interface inicial acessível sem login.                  | Como visitante, quero ver uma introdução do projeto sem me cadastrar. |
| 15 | Sprint 05 | Relacionamento usuário-empresa             | Funcional          | Should      | Permitir que usuários sigam empresas.                   | Como usuário, quero seguir empresas de interesse.                  |
| 16 | Sprint 05 | Tabelas de postagens                       | Não funcional      | Must        | Estruturar banco para sistema de postagens.             | Como desenvolvedor, preciso modelar postagens no banco.            |
| 17 | Sprint 05 | Ata de reunião 09/06                       | Não funcional      | Could       | Registrar tópicos discutidos em 09/06.                  | Como equipe, queremos documentar nossas reuniões.                  |
| 18 | Sprint 05 | Página pública da empresa                  | Funcional          | Must        | Visualizar informações abertas da empresa.              | Como visitante, quero ver perfis de empresas.                      |
| 19 | Sprint 05 | Página pública de um post                  | Funcional          | Must        | Permitir a visualização pública de postagens.           | Como usuário, quero acessar conteúdo postado por outros.           |
| 20 | Sprint 05 | Ata de reunião 11/06                       | Não funcional      | Could       | Documentar reunião de 11/06.                            | Como equipe, precisamos registrar nossas decisões.                 |
| 21 | Sprint 06 | Login no front-end                         | Funcional          | Must        | Autenticar usuários via interface visual.               | Como usuário, quero fazer login pela interface do site.            |
| 22 | Sprint 06 | Atualização da arquitetura                 | Não funcional      | Should      | Revisar o documento de arquitetura após mudanças.       | Como equipe, precisamos atualizar a documentação técnica.          |
| 23 | Sprint 06 | Responsividade dos cards e menus           | Não funcional      | Should      | Ajustar o layout para diferentes tamanhos de tela.      | Como usuário, quero que a aplicação funcione bem em qualquer dispositivo. |
| 24 | Sprint 06 | Imagem padrão de perfil                    | Funcional          | Should      | Exibir imagem padrão em perfis sem foto.                | Como usuário, quero uma imagem padrão se eu não enviar uma.        |
| 25 | Sprint 06 | API para dados do usuário logado           | Funcional          | Must        | Fornecer dados do usuário autenticado.                  | Como sistema, preciso retornar dados do usuário autenticado.       |
| 26 | Sprint 06 | Tabelas de áreas de atuação/interesse      | Não funcional      | Must        | Criar tabelas para categorizar usuários.                | Como desenvolvedor, quero classificar usuários por áreas de interesse. |
| 27 | Sprint 06 | Página de usuário logado                   | Funcional          | Must        | Exibir informações personalizadas ao usuário autenticado. | Como usuário, quero acessar minha área personalizada.              |
| 28 | Sprint 06 | Página Home logado                         | Funcional          | Must        | Apresentar conteúdo exclusivo para usuários logados.    | Como usuário, quero uma home com recomendações personalizadas.     |
| 29 | Sprint 06 | Rodapé (footer)                            | Funcional          | Should      | Exibir informações institucionais no rodapé.            | Como visitante, quero acessar informações úteis no rodapé.         |
| 30 | Sprint 06 | Verificação de consistência com o Figma    | Não funcional      | Should      | Conferir se o layout implementado corresponde ao design. | Como equipe, queremos garantir fidelidade ao protótipo.            |
| 31 | Sprint 06 | API de cadastro de empresas                | Funcional          | Must        | Cadastrar empresas via API.                             | Como empresa, quero registrar meus dados via sistema.              |
| 32 | Sprint 07 | API de mensagens entre empresas            | Funcional          | Should      | Criar estrutura inicial para mensagens.                 | Como empresa, quero me comunicar com outras empresas.              |
| 33 | Sprint 07 | Conectar perfil da empresa à API           | Funcional          | Must        | Exibir informações vindas da API na interface de perfil. | Como visitante, quero ver perfis de empresa com dados reais.       |
| 34 | Sprint 07 | Rota pública de perfil de usuário          | Funcional          | Must        | Permitir acesso externo a perfis de usuário.            | Como visitante, quero ver perfis de usuários públicos.             |
| 35 | Sprint 07 | Editar dados do usuário                    | Funcional          | Must        | Permitir que o usuário edite seus dados na plataforma.  | Como usuário, quero atualizar minhas informações.                  |
| 36 | Sprint 07 | Configuração de usuário                    | Funcional          | Should      | Configurações de segurança e privacidade.               | Como usuário, quero controlar minhas configurações de conta.       |
| 37 | Sprint 07 | Criação de postagens                       | Funcional          | Should      | Permitir ao usuário criar novos posts.                  | Como usuário, quero postar conteúdo na plataforma.                 |
| 38 | Sprint 07 | Templates no Figma                         | Não funcional      | Could       | Criar modelos visuais de telas finais.                  | Como equipe, queremos preparar layouts para revisão.               |
| 39 | Sprint 07 | Edição de dados na API                     | Funcional          | Must        | Permitir editar dados do usuário via API.               | Como sistema, quero atualizar os dados conforme as alterações feitas. |
| 40 | Sprint 07 | Conectar perfil à API de usuários          | Funcional          | Must        | Exibir perfis com dados vindos da API.                  | Como visitante, quero ver perfis com dados reais.                  |

*Fonte: De autoria própria.*

## Perfis 
- A Tabela 11: Tabela de Perfis, apresenta seis perfis de usuário distintos, cada um com características e permissões específicas dentro da plataforma. O perfil Administrador (P1) possui controle total, incluindo gestão de usuários e configurações gerais. O Dono de Empresa (P2) e o Vice-Dono (P3) atuam como representantes legais, com restrições na criação de cargos para o último. O Gestor de Contratos (P4) é responsável por negociações, enquanto o Comunicador (P5) tem permissão apenas para interações sem poder de edição. Por fim, o Visitante (P6) tem acesso limitado à visualização de dados, sem possibilidade de contato ou contrato.

*Tabela 11: Tabela de perfis.*

| #id | Nome do Perfil           | Características do Perfil                                      | Permissões de Acesso                                                                                     |
|-----|--------------------------|----------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| P1  | Administrador            | Desenvolvedores ou gestores técnicos com controle total da aplicação | Manter usuários, gerenciar dados globais, criar/editar/excluir empresas, acessar logs e configurações gerais |
| P2  | Dono de Empresa          | Representa legalmente a empresa dentro da plataforma           | Criar e distribuir cargos, editar dados da empresa, gerenciar contratos, iniciar contatos               |
| P3  | Vice-Dono                | Suporte ao Dono, sem autonomia para gerenciar cargos           | Todas as permissões do Dono, exceto criar/distribuir cargos                                             |
| P4  | Gestor de Contratos      | Responsável por processos de negociação e gerenciamento de contratos | Página de gerenciamento de contratos, iniciar contatos com empresas                                    |
| P5  | Comunicador              | Representante da empresa para diálogos, não tem poderes legais ou de edição de dados | Iniciar e responder contatos                                                                     |
| P6  | Visitante (Usuário comum) | Usuário sem vínculo com empresa                                | Visualizar empresas cadastradas, realizar buscas, sem possibilidade de contato ou contrato              |

*Fonte: De autoria própria.*

## Cenários	 

- **A Tabela 12: Tabela de Cenários**, descreve os principais cenários funcionais do sistema EcoNet, organizados por sprints de desenvolvimento, refletindo fielmente o backlog detalhado do sistema e apresentando 21 cenários funcionais organizados por sprint. A tabela inclui:
- Cadastros básicos (Pessoa Física e Empresa) na Sprint 1 (C-1 a C-3)
- Autenticação e infraestrutura (Login, Banco de Dados) na Sprint 2 (C-4 a C-6)
- Funcionalidades de interação (Relacionamento usuário-empresa, Postagens) nas Sprints 5 a 7 (C-12 a C-21)
- Integrações críticas com APIs (Dados do usuário, Mensagens entre empresas) nas Sprints 6 e 7 (C-16, C-18, C-19)

*Tabela 12: Tabela de cenários.*

| Numeração do cenário | Nome do cenário                     | Sprint |
|----------------------|-------------------------------------|--------|
| C-1                  | Cadastrar Pessoa Física             | 1      |
| C-2                  | Cadastrar Empresa                   | 1      |
| C-3                  | Layout de navegação (Navbar)        | 1      |
| C-4                  | Página de Login                     | 2      |
| C-5                  | Criação do Banco de Dados           | 2      |
| C-6                  | Protótipos no Figma                 | 2      |
| C-7                  | Página Home (sem login)             | 3      |
| C-8                  | Documento de Arquitetura            | 3      |
| C-9                  | Formulário de cadastro com backend  | 4      |
| C-10                 | Página pública de usuário           | 4      |
| C-11                 | Página Home pública (sem login)     | 5      |
| C-12                 | Relacionamento usuário-empresa      | 5      |
| C-13                 | Página pública da empresa           | 5      |
| C-14                 | Página pública de postagens         | 5      |
| C-15                 | Login no front-end                  | 6      |
| C-16                 | API para dados do usuário logado    | 6      |
| C-17                 | Página de usuário logado            | 6      |
| C-18                 | API de cadastro de empresas         | 6      |
| C-19                 | API de mensagens entre empresas     | 7      |
| C-20                 | Editar dados do usuário             | 7      |
| C-21                 | Criação de postagens                | 7      |

*Fonte: Adaptado do Backlog da Tabela 10.*

---

## Referência
### Documento de visão do produto e do projeto
Para acessar a versão mais atual (v1.2.0) do documento de visão do produto e do projeto, consulte o pdf  
[Visão do Produto e do Projeto - EcoNet](../../static/files/visao-do-produto-e-do-projeto-algiz-2025.1.pdf)
