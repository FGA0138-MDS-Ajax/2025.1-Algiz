# EcoNet

Este repositório contém o projeto (EcoNet) do grupo ALGIZ desenvolvido com Node.js, React e JavaScript. Neste arquivo README, você encontrará um guia passo a passo para executar o projeto em seu ambiente local.

## Sobre o projeto

EcoNet é um site que possibilita que empresas se conectem para firmar parcerias na área de reaproveitamento de matéria-prima, onde teremos empresas atuando como fornecedoras ou como consumidoras, criando um ciclo sustentável de reaproveitamento de matéria-prima. 

##### Autores:

<!-- Tabela com os nomes e fotos-->
| <a href="https://github.com/anawirthmann"><img src="https://avatars.githubusercontent.com/u/91133974?v=4" width="150"></a> | <a href="https://github.com/arthor13"><img src="https://avatars.githubusercontent.com/u/112632734?v=4" width="150"></a> | <a href="https://github.com/CauaNicolas"><img src="https://avatars.githubusercontent.com/u/79241219?v=4" width="150"></a> | <a href="https://github.com/SDC-Diih"><img src="https://avatars.githubusercontent.com/u/48413982?v=4" width="150"></a> | <a href="https://github.com/gabrielaugusto23"><img src="https://avatars.githubusercontent.com/u/103151217?v=4" width="150"></a> | <a href="https://github.com/bielg7"><img src="https://avatars.githubusercontent.com/u/150948362?v=4" width="150"></a> |
|----------|----------|----------|----------|----------|----------|
| [Ana Beatriz C. Wirthmann](https://github.com/anawirthmann) | [Arthur de Lima Sobreira](https://github.com/arthor13) | [Caua Nicolas](https://github.com/CauaNicolas) | [Diogo Oliveira Ferreira](https://github.com/SDC-Diih) | [Gabriel Augusto](https://github.com/gabrielaugusto23) | [Gabriel Pereira](https://github.com/bielg7) |

| <a href="https://github.com/Discicle"><img src="https://avatars.githubusercontent.com/u/117182979?v=4" width="150"></a> | <a href="https://github.com/jopesmp"><img src="https://avatars.githubusercontent.com/u/113356974?v=4" width="150"></a> | <a href="https://github.com/juliapat18"><img src="https://avatars.githubusercontent.com/u/204951019?v=4" width="150"></a> | <a href="https://github.com/marianagonzaga0"><img src="https://avatars.githubusercontent.com/u/193804034?v=4" width="150"></a> | <a href="https://github.com/rFaelxs"><img src="https://avatars.githubusercontent.com/u/176593068?v=4" width="150"></a> | <a href="https://github.com/TiagoSTdeLyra"><img src="https://avatars.githubusercontent.com/u/56367136?v=4" width="150"></a> |
|----------|----------|----------|----------|----------|----------|
| [João Victor Sousa](https://github.com/Discicle) | [João Pedro Sampaio](https://github.com/jopesmp) | [Julia Oliveira Patricio](https://github.com/juliapat18) | [Mariana Ribeiro](https://github.com/marianagonzaga0) | [Rafael Siqueira Soares](https://github.com/rFaelxs) | [Tiago Scherrer](https://github.com/TiagoSTdeLyra) |


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
