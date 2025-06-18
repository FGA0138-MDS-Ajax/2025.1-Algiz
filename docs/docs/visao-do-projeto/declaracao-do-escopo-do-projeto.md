---
sidebar_label: "Declaração do escopo do projeto"
sidebar_position: 9
---
# Declaração do escopo do projeto

### Backlog do produto
- Os requisitos estão declarados na tabela 4.4 - Backlog do produto

| **Numeração (Cenário / requisito)** | **Nome do requisito**                          | **Priorização do requisito** Must, Should, Could |
|-------------------------------------|------------------------------------------------|--------------------------------------------------|
| R - 0.1                             | Criar Barra de Navegação                       | Must have                                       |
| R - 0.2                             | Criar Página de Cadastro (Empresas)            | Must have                                       |
| R - 0.3                             | Criar Página de Cadastro (Pessoa física)       | Must have                                       |
| R - 0.4                             | Criar e Integrar o Banco de Dados              | Must have                                       |
| R - 1.1                             | Criar a Página de Login                        | Must have                                       |
| R - 1.2                             | Criar a funcionalidade de Registro/Login       | Must have                                       |



### Perfis de usuário

| **#id** | **Nome do Perfil**           | **Características do Perfil**                                                                 | **Permissões de Acesso**                                                                                 |
|--------|------------------------------|------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| P1     | Administrador                | Desenvolvedores ou gestores técnicos com controle total da aplicação                           | Manter usuários, gerenciar dados globais, criar/editar/excluir empresas, acessar logs e configurações gerais |
| P2     | Dono de Empresa              | Representa legalmente a empresa dentro da plataforma                                            | Criar e distribuir cargos, editar dados da empresa, gerenciar contratos, iniciar contatos                 |
| P3     | Vice-Dono                    | Suporte ao Dono, sem autonomia para gerenciar cargos                                            | Todas as permissões do Dono, exceto criar/distribuir cargos                                              |
| P4     | Gestor de Contratos          | Responsável por processos de negociação e gerenciamento de contratos                               | Gerenciar contratos, iniciar contatos com empresas                                                         |
| P5     | Comunicador                  | Representante da empresa para diálogos, não tem poderes legais ou de edição de dados            | Iniciar e responder contatos                                                                             |
| P6     | Visitante (Usuário comum)    | Usuário sem vínculo com empresa                                                                | Visualizar empresas cadastradas, realizar buscas, sem possibilidade de contato ou contrato              |

### Cenários

## Sistema: EcoNet – Cenários funcionais

| **Numeração do cenário** | **Nome do cenário**                   | **Sprints** |
|--------------------------|----------------------------------------|-------------|
| C-1                      | Cadastrar empresa                      | 1           |
| C-2                      | Cadastrar Pessoa Física                | 1           |
| C-2.1                    | Criação de Perfis                      | 2           |
| C-3                      | Login e Autenticação                   | 2           |
| C-4                      | Criação e Distribuição de Cargos       | 3           |
| C-5                      | Contato entre Empresas (Chat)          | 3           |
