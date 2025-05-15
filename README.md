# EcoNet

Este repositório contém o projeto (EcoNet) do grupo ALGIZ desenvolvido com Node.js, React e JavaScript. Neste arquivo README, você encontrará um guia passo a passo para executar o projeto em seu ambiente local.

## Sobre o projeto

EcoNet é um site que possibilita que empresas se conectem para firmar parcerias na área de reaproveitamento de matéria-prima, onde teremos empresas atuando como fornecedoras ou como consumidoras, criando um ciclo sustentável de reaproveitamento de matéria-prima. 

##### Autores:

<!-- Tabela com os nomes e fotos-->
| <a href="https://github.com/anawirthmann"><img src="https://avatars.githubusercontent.com/u/91133974?v=4" width="150" ></img></a> | <a href="https://github.com/arthor13"><img src="https://avatars.githubusercontent.com/u/112632734?v=4" width="150"></img></a> | <a href="https://github.com/CauaNicolas"><img src="https://avatars.githubusercontent.com/u/79241219?v=4" width="150"></img></a> | <a href="https://github.com/SDC-Diih"><img src="https://avatars.githubusercontent.com/u/48413982?v=4" width="150"></img></a> | <a href="https://github.com/gabrielaugusto23"><img src="https://avatars.githubusercontent.com/u/103151217?v=4" width="150"></img></a> |<a href="https://github.com/bielg7"><img src="https://avatars.githubusercontent.com/u/150948362?v=4" width="150"></img></a> | <a href="https://github.com/Discicle"><img src="https://avatars.githubusercontent.com/u/117182979?v=4" width="150"></img></a>| <a href="https://github.com/juliapat18"><img src="https://avatars.githubusercontent.com/u/204951019?v=4" width="150"></img></a> | <a href="https://github.com/marianagonzaga0"><img src="https://avatars.githubusercontent.com/u/193804034?v=4" width="150"></img></a> | <a href="https://github.com/rFaelxs"><img src="https://avatars.githubusercontent.com/u/176593068?v=4" width="150"></img></a> | <a href="https://github.com/TiagoSTdeLyra"><img src="https://avatars.githubusercontent.com/u/56367136?v=4" width="150"></img></a> |
|----------|:------:|:------:|:------:|:------:|:------:|:------:|:------:|:------:|:------:|:------:|
|[Ana Beatriz C. Wirthmann](https://github.com/anawirthmann)|  [Arthur de Lima Sobreira](https://github.com/arthor13) | [Caua Nicolas](https://github.com/CauaNicolas) | [Diogo Oliveira Ferreira](https://github.com/SDC-Diih) | [Gabriel Augusto](https://github.com/gabrielaugusto23) |[Gabriel Pereira](https://github.com/bielg7) |[João Victor Sousa](https://github.com/Discicle) | [Julia Oliveira Patricio](https://github.com/juliapat18) | [Mariana Ribeiro](https://github.com/marianagonzaga0) | [Rafael Siqueira Soares](https://github.com/rFaelxs) | [Tiago Scherrer](https://github.com/TiagoSTdeLyra) |

## Pré-requisitos

Antes de começar, verifique se você possui as seguintes ferramentas instaladas em sua máquina:

- Node.js (versão 20 ou superior)
- npm (gerenciador de pacotes do Node.js)
- Docker
  
# template-repository - Branch Main

Template de Repositório para a matéria de Métodos de Desenvolvimento de Software lecionado pelo professor Ricardo Ajax.

Essa Branch deve ser usada exclusivamente para a versão de produção dos softwares da equipe.

O repositório conta com mais 3 branchs:
* docs: Usada para armazenar a documentação do projeto.
* developer: usada como um intermediário antes do código chegar realmente para produção. É o ambiente ideal para realizar os últimos testes antes das apresentações.
* gh-pages: Local dos arquivos estáticos de deploy da documentação. (Para deploy da documentação, consultar seu monitor)

## Especificações Técnicas do Repositório

Este repositório é planejado e estruturado para que seja realizado documentações de software. Caso haja outra necessidades, deve-se consultar a professora.

Atualmente se usa a ferramenta MkDocs para gerar sua documentação baseado nos seus arquivos markdowns, vocês podem achar mais instruções sobre o MkDocs através do link da documentação da ferramenta: [https://www.mkdocs.org/](https://www.mkdocs.org/).

Também é usado uma "sub-ferramenta" do MkDocs para sua estilização, o Material Theme, que pode ser consultado através do link: [https://squidfunk.github.io/mkdocs-material/](https://squidfunk.github.io/mkdocs-material/).

Este repositório também conta com uma pipeline de automatização de deploy do seu conteúdo MkDocs, para que a cada commit feito na main, a pipeline gere uma versão atualizada da sua documentação em minutos. Vale ressaltar que é importante realizar uma configuração para que tudo funcione da forma correta, as instruções são as seguintes:

* Acesse as configurações do repositório;
* Procure a aba de "Pages"
* Em "Source" escolha a opção "Deploy from a branch";
* Em "Branch" escolha "gh-pages";
* Clique em salvar e pronto;

Após essas etapas de configuração, o seu GitPages deve funcionar normalmente.
