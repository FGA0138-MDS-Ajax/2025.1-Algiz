# 🤝 Guia de Contribuição - Projeto EcoNet (2025.1-Algiz)

Obrigado por querer contribuir com o EcoNet! Este documento descreve as diretrizes e boas práticas para colaborar com o projeto.

---

## 🧪 Como configurar o ambiente

1. Clone o repositório:
   ```bash
   git clone https://github.com/FGA0138-MDS-Ajax/2025.1-Algiz.git
   cd 2025.1-Algiz
   ```

2. Instale as dependências de cada pacote:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   cd ../docs
   npm install
   ```

3. Para rodar o sistema completo com Docker:
   ```bash
   docker compose up --build
   ```

---

## 🌱 Fluxo de Contribuição

1. **Crie um fork** do repositório.
2. **Crie uma branch** com um nome descritivo:
   ```bash
   git checkout -b feat/nome-da-funcionalidade
   ```
3. Faça seus commits seguindo as [regras de commits](#-padr%C3%A3o-de-commits).
4. **Submeta um Pull Request** para a branch `developer`.
5. Aguarde revisão e feedback do time.

---

## 🌳 Política de Branches

- `main`: Branch de produção. Apenas releases estáveis.
- `developer`: Integração contínua de novas funcionalidades. Todos os PRs devem ser direcionados para cá.
- `docs`: Conteúdo da documentação.
- `gh-pages`: Site público da documentação (gerado pelo Docusaurus).

**Regra**: nunca faça *push* diretamente na `main` ou `developer`, utilize PRs.

---

## 📝 Padrão de Commits

Usamos o padrão **[gitmoji](https://gitmoji.dev/)** nos commits para facilitar a leitura do histórico.

### Exemplos:
- ✨ `feat: Adiciona componente de recomendação`
- 🐛 `fix: Corrige bug no formulário de login`
- 📝 `docs: Atualiza documentação do README`
- ♻️ `refactor: Melhora estrutura de código da API`

Use `git commit` com emojis no início da mensagem. Você pode usar [gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli) para facilitar:

```bash
npx gitmoji -c
```

---

## 🔁 Modelo de Pull Request

Inclua no seu PR as seguintes seções:

```
PR Title: [Descrição breve do que foi feito]

🔗 Issues Relacionadas:
- Resolve #123

✅ Alterações Realizadas:
- Item 1
- Item 2

🛠 Como Testar:
- Passos para testar a funcionalidade

📌 Observações:
- Observações relevantes
```

---

## 🔍 Boas práticas

- Escreva código limpo e documentado.
- Teste antes de enviar seu PR.
- Siga o padrão do projeto e arquitetura definida no [Documento de Arquitetura](docs/arquitetura).
- Sempre sincronize sua branch com a `developer` antes de abrir um PR:
  ```bash
  git checkout developer
  git pull origin developer
  git checkout sua-branch
  git merge developer
  ```

---

## 📬 Dúvidas?

Entre em contato com a equipe ou abra uma issue com a tag `dúvida`.