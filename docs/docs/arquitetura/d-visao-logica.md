---
sidebar_label: "Visão lógica"
sidebar_position: 4
---
# Visão lógica 

### Arquitetura em Camadas do Sistema EcoNet:
A Arquitetura em Camadas adotada no sistema EcoNet organiza os módulos com funcionalidades similares em camadas verticais distintas, organizando o sistema em níveis de responsabilidade e promovendo um baixo acoplamento entre seus componentes. Esta abordagem facilita a manutenção, a escalabilidade e a especialização das responsabilidades dentro do sistema. A camada de apresentação lida com a interface do usuário e a interação com o navegador, a camada de negócios é responsável pela lógica da aplicação referente às práticas sustentáveis e interações entre empresas, e a camada de dados/persistência gerencia o armazenamento e a recuperação das informações sobre materiais, usuários e contratos.
O sistema EcoNet é subdividido nos seguintes módulos principais, que representam suas camadas:  

**Camada de Apresentação (Frontend):** Responsável por toda a interface com o(a) usuário(a) do EcoNet e pelas lógicas de comunicação com os navegadores. Esta camada constrói e exibe as telas de login, o painel principal com o feed de postagens de materiais e conteúdos, os formulários para criação e edição de anúncios de materiais disponíveis ou necessários, os perfis de empresas e as ferramentas de interação, garantindo uma experiência de usuário intuitiva e responsiva.  

**Camada de Negócios (Backend/API):** Responsável por executar as operações e fluxos de negócios específicos associados a uma requisição vinda da camada de apresentação. No EcoNet, isso inclui validar dados de cadastro de usuários e empresas, processar a criação e o gerenciamento de postagens (anúncios de materiais), gerenciar o sistema de seguir empresas, facilitar os contatos e a organização de contratos de reaproveitamento, aplicar regras de permissão baseadas nos papéis dos usuários e orquestrar as interações com a camada de persistência.  

**Camada de Persistência (Dados):** Esta camada é responsável por gerenciar todas as operações de armazenamento, acesso e recuperação dos dados do EcoNet. Ela centraliza a interação com o sistema de gerenciamento de banco de dados, abstraindo os detalhes técnicos sobre onde e como os dados são fisicamente salvos. Nela, são gerenciadas informações essenciais como dados dos usuários (tanto físicos quanto jurídicos), cadastro de empresas, postagens (ofertas e procura de materiais), tags, curtidas, materiais salvos, contratos firmados e configurações do sistema. Essa abordagem garante que os dados sejam organizados, armazenados de forma segura e recuperados de maneira eficiente, facilitando a manutenção e a evolução do sistema e permitindo que as demais camadas interajam com os dados sem se preocupar com os detalhes do armazenamento físico.
Todas estas camadas no EcoNet são projetadas para serem o mais independentes possíveis, formando uma abstração em torno de suas responsabilidades e do trabalho a ser realizado dentro de uma requisição específica. A comunicação entre as camadas é bem definida, permitindo que cada uma evolua sem impactar diretamente as outras, e podendo ser configurada para ser aberta ou fechada conforme as necessidades de interação e segurança estabelecidas pela equipe de desenvolvimento do EcoNet.

---

## Referência
### Documento de arquitetura
Para acessar a versão mais atual (v1.3.0) do documento de arquitetura, consulte o pdf  
[Documento de arquitetura - EcoNet](../../static/files/documento-de-arquitetura-algiz-2025.1.pdf)