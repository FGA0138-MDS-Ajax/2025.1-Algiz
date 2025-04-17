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
