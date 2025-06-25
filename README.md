# EcoNet

Este repositório contém o projeto (EcoNet) do grupo ALGIZ desenvolvido com Node.js, React e JavaScript. Neste arquivo README, você encontrará um guia passo a passo para executar o projeto em seu ambiente local.

![License](https://img.shields.io/badge/license-MIT-green)
![Issues](https://img.shields.io/github/issues/FGA0138-MDS-Ajax/2025.1-Algiz)
![Contributors](https://img.shields.io/github/contributors/FGA0138-MDS-Ajax/2025.1-Algiz)
![Stars](https://img.shields.io/github/stars/FGA0138-MDS-Ajax/2025.1-Algiz)
![Views](https://komarev.com/ghpvc/?username=FGA0138-MDS-Ajax&label=views)
![Forks](https://img.shields.io/github/forks/FGA0138-MDS-Ajax/2025.1-Algiz)
![Last Commit](https://img.shields.io/github/last-commit/FGA0138-MDS-Ajax/2025.1-Algiz)

## Sobre o projeto

EcoNet é um site que possibilita que empresas se conectem para firmar parcerias na área de reaproveitamento de matéria-prima, onde teremos empresas atuando como fornecedoras ou como consumidoras, criando um ciclo sustentável de reaproveitamento de matéria-prima. 


## 🚀 Tecnologias Utilizadas

![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=flat&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/react-%2361DAFB.svg?style=flat&logo=react&logoColor=black)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=flat&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white)
![AdminJS](https://img.shields.io/badge/adminjs-%23D35848.svg?style=flat&logo=adminjs&logoColor=white) <!-- custom -->
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=flat&logo=github&logoColor=white)
![Docusaurus](https://img.shields.io/badge/docusaurus-%230A0A0A.svg?style=flat&logo=docusaurus&logoColor=white)

## Pré-requisitos

Antes de começar, recomendamos que você utilize o sistema operacional **Linux ou Linux WSL (Ubuntu)**, 
verifique também se você possui as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)
- [Docker](https://www.docker.com/)

---

## Passo 1: Clonar o repositório

Clone este repositório em uma pasta da sua máquina local:

```bash
git clone https://github.com/FGA0138-MDS-Ajax/2025.1-Algiz.git
```

---
## Passo 2: Primeira configuração

Copie `.env.example` para `.env` na pasta backend:

```bash
cd backend
cp .env.example .env
```
### Configuração de chaves opcionais  
O projeto possui funcionalidades que utilizam serviços externos opcionais. Você pode configurá-los editando o arquivo `.env`:

```bash
nano .env  # ou use seu editor preferido
```
### Chaves necessárias para funcionalidades completas:
1. Resend API Key (para envio de emails):
    - Necessário para: Recuperação de senha via email
    - Como obter: Obtenha a chave com o `manager` do projeto ou crie uma conta em [Resend](Resend.com)
    - Adicione no `.env`:
      ```bash
      RESEND_API_KEY=sua_chave_aqui
      ```
    
2. reCAPTCHA Secret Key (para verificação de humanos):
    - Necessário para: Proteção contra bots no formulário de recuperação de senha
    - Como obter:Obtenha a chave com o `manager` do projeto ou registre seu site em [Google reCAPTCHA](https://www.google.com/recaptcha/admin/create)
    - Adicione no `.env`:
      ```bash
      RECAPTCHA_SECRET_KEY=sua_chave_aqui
      ```
### Modo de operação sem chaves:
O projeto pode rodar sem essas chaves, com as seguintes limitações:  
A funcionalidade de recuperação de senha mostrará "Serviço indisponível"  

---
## Passo 3: Instalar dependências

Navegue até a pasta do projeto e execute os seguintes comandos para instalar as dependências do Node.js:

```bash
cd 2025.1-ALGIZ

cd backend
npm install

cd ../frontend
npm install

cd ../docs
npm install
```

---

## Passo 4: Iniciar o servidor

### Backend (usando Docker)

Abra o terminal, vá até a pasta `backend` e execute:

```bash
cd backend
docker compose up --build
```

🔁 Resetar banco de dados:
Se você deseja apagar todo o banco, reconstruir os containers e aplicar os dados do zero (ideal para desenvolvimento), utilize o script abaixo:

```bash
./scripts/reset-db.sh
```
Este script irá:
- Derrubar os containers e volumes ```bash docker compose down -v ``` 
- Subir tudo novamente ```bash docker compose up ```

💡 Recomendado quando você quer garantir que está usando dados de teste atualizados.

⚙️ Rodar apenas migrations e seeders:
Primeiro: Certifique-se de que o backend esteja rodando com os containers Docker.
Se já está em execução (containers já estão rodando), você pode apenas aplicar as migrations e popular com os dados iniciais usando:
``` bash
./scripts/setup-db.sh
```
Esse script irá:
- Executar as migrations ```bash sequelize-cli db:migrate ```
- Rodar os seeders ```bash sequelize-cli db:seed:all ```

### Frontend

Em outro terminal, vá até a pasta `frontend`:

```bash
cd frontend
npm run dev
```

O frontend estará disponível em: [http://localhost:5173](http://localhost:5173)

### Documentação (Docusaurus)

Em outro terminal, vá até a pasta `docs`:

```bash
cd docs
npm run start
```

A documentação estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## Observações

- O backend roda na porta `3001` via Docker.
- O frontend utiliza Vite.js e roda na porta `5173`.
- A documentação está disponível na porta `3000`.
- Certifique-se de que as portas não estejam em uso por outros serviços locais.
- Se o MySQL não conseguir iniciar:
  - Tente `docker compose down -v` e depois `docker compose up --build`
  - Verifique os registros com `docker compose logs db`

- Para se conectar ao contêiner do MySQL:
  ```bash
  docker exec -it backend-db-1 mysql -u root -pyourpassword
  ```
  
---
### Regra de commit:
Utilizar o [gitmoji](https://gitmoji.dev/) no começo de cada commit  
Ex:  
📝 Atualização da documentação

---

### Template de Pull Request:
```bash
PR Title: [Descrição breve do que foi feito]

🔗 Issues Relacionadas:

Resolve #1234 (substitua pelo número da issue, se o pr resolve a issue)

Relacionado a #5678 (substitua pelo número da issue, use caso o PR não resolver completamente a issue)

✅ Alterações Realizadas:
   - Item 1
   - Item 2

🛠 Como Testar: (opcional)
   - Passo 1
   - Passo 2

📌 Observações: (opcional)
   - Algum detalhe extra?
```
## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/anawirthmann"><img src="https://avatars.githubusercontent.com/u/91133974?v=4?s=100" width="100px;" alt="Ana Beatriz C Wirthmann"/><br /><sub><b>Ana Beatriz C Wirthmann</b></sub></a><br /><a href="https://github.com/FGA0138-MDS-Ajax/2025.1-Algiz/commits?author=anawirthmann" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/arthor13"><img src="https://avatars.githubusercontent.com/u/112632734?v=4?s=100" width="100px;" alt="Arthur de Lima Sobreira"/><br /><sub><b>Arthur de Lima Sobreira</b></sub></a><br /><a href="https://github.com/FGA0138-MDS-Ajax/2025.1-Algiz/commits?author=arthor13" title="Code">💻</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/CauaNicolas"><img src="https://avatars.githubusercontent.com/u/79241219?v=4?s=100" width="100px;" alt="CauaNicolas"/><br /><sub><b>CauaNicolas</b></sub></a><br /><a href="https://github.com/FGA0138-MDS-Ajax/2025.1-Algiz/commits?author=CauaNicolas" title="Code">💻</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/SDC-Diih"><img src="https://avatars.githubusercontent.com/u/48413982?v=4?s=100" width="100px;" alt="Diogo"/><br /><sub><b>Diogo</b></sub></a><br /><a href="https://github.com/FGA0138-MDS-Ajax/2025.1-Algiz/commits?author=SDC-Diih" title="Code">💻</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/gabrielaugusto23"><img src="https://avatars.githubusercontent.com/u/103151217?v=4?s=100" width="100px;" alt="Gabriel Augusto"/><br /><sub><b>Gabriel Augusto</b></sub></a><br /><a href="https://github.com/FGA0138-MDS-Ajax/2025.1-Algiz/commits?author=gabrielaugusto23" title="Code">💻</a> <a href="https://github.com/FGA0138-MDS-Ajax/2025.1-Algiz/commits?author=gabrielaugusto23" title="Documentation">📖</a> <a href="#design-gabrielaugusto23" title="Design">🎨</a> <a href="https://github.com/FGA0138-MDS-Ajax/2025.1-Algiz/commits?author=gabrielaugusto23" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/bielg7"><img src="https://avatars.githubusercontent.com/u/150948362?v=4?s=100" width="100px;" alt="Gabriel Pereira"/><br /><sub><b>Gabriel Pereira</b></sub></a><br /><a href="https://github.com/FGA0138-MDS-Ajax/2025.1-Algiz/commits?author=bielg7" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="16.66%"><a href="https://lattes.cnpq.br/3832259830250068"><img src="https://avatars.githubusercontent.com/u/117182979?v=4?s=100" width="100px;" alt="João Victor Sousa"/><br /><sub><b>João Victor Sousa</b></sub></a><br /><a href="https://github.com/FGA0138-MDS-Ajax/2025.1-Algiz/commits?author=Discicle" title="Code">💻</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/jopesmp"><img src="https://avatars.githubusercontent.com/u/113356974?v=4?s=100" width="100px;" alt="João Pedro Sampaio"/><br /><sub><b>João Pedro Sampaio</b></sub></a><br /><a href="https://github.com/FGA0138-MDS-Ajax/2025.1-Algiz/commits?author=jopesmp" title="Code">💻</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/juliapat18"><img src="https://avatars.githubusercontent.com/u/204951019?v=4?s=100" width="100px;" alt="juliapat18"/><br /><sub><b>juliapat18</b></sub></a><br /><a href="https://github.com/FGA0138-MDS-Ajax/2025.1-Algiz/commits?author=juliapat18" title="Code">💻</a> <a href="https://github.com/FGA0138-MDS-Ajax/2025.1-Algiz/commits?author=juliapat18" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/marianagonzaga0"><img src="https://avatars.githubusercontent.com/u/193804034?v=4?s=100" width="100px;" alt="marianagonzaga0"/><br /><sub><b>marianagonzaga0</b></sub></a><br /><a href="https://github.com/FGA0138-MDS-Ajax/2025.1-Algiz/commits?author=marianagonzaga0" title="Documentation">📖</a> <a href="https://github.com/FGA0138-MDS-Ajax/2025.1-Algiz/commits?author=marianagonzaga0" title="Code">💻</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/rFaelxs"><img src="https://avatars.githubusercontent.com/u/176593068?v=4?s=100" width="100px;" alt="Rafael Siqueira Soares"/><br /><sub><b>Rafael Siqueira Soares</b></sub></a><br /><a href="https://github.com/FGA0138-MDS-Ajax/2025.1-Algiz/commits?author=rFaelxs" title="Code">💻</a> <a href="https://github.com/FGA0138-MDS-Ajax/2025.1-Algiz/commits?author=rFaelxs" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/TiagoSTdeLyra"><img src="https://avatars.githubusercontent.com/u/56367136?v=4?s=100" width="100px;" alt="TiagoSTdeLyra"/><br /><sub><b>TiagoSTdeLyra</b></sub></a><br /><a href="https://github.com/FGA0138-MDS-Ajax/2025.1-Algiz/commits?author=TiagoSTdeLyra" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!