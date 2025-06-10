---
sidebar_label: "Diagrama de classes e pacote"
sidebar_position: 6
---
# Diagrama de classes e pacote  

# Diagrama de Classes

Este diagrama de classes representa um modelo de dados para o sistema EcoNet, mostrando como as diferentes entidades do sistema estão relacionadas entre si e quais atributos e métodos elas possuem.

## Classes e Relações

### **Usuário**
Representa um usuário genérico do sistema, com atributos para identificação, contato e autenticação.

- **Atributos**: `idUsuario`, `email`, `senha`, `telefone`, `estado`
- **Métodos**:
  - `login()`
  - `alterarSenha()`
  - `editarPerfil()`
  - `seguirEmpresa()`
  - `visualizarPerfilEmpresa()`
  - `curtirPostagem()`
  - `salvarPostagem()`

### **Físico** (Especialização de `Usuário`)
Representa uma pessoa física.

- **Atributos**: `cpf`, `nome`, `sobrenome`, `sexo`, `dataNascimento`, `fotoPerfil`

### **Jurídico** (Especialização de `Usuário`)
Representa uma empresa.

- **Atributos**: `cnpj`, `razaoSocial`, `nomeComercial`, `ramoAtuacao`, `fotoPerfil`
- **Métodos**:
  - `criarPostagem()`
  - `editarEmpresa()`
  - `deletarEmpresa()`
  - `seguirOutraEmpresa()`
  - `editarPostagem()`

### **Postagem**
Representa um anúncio de material.

- **Métodos**:
  - `editarPostagem()`
  - `excluirPostagem()`
  - `adicionarTag()`
  - `curtir()`
  - `salvar()`
  - `compartilhar()`

### **Cargo**
Define funções dentro de uma empresa.

- **Atributos**: `idCargo`, `nomeCargo`, `permissao`

### **Contrato**
Armazena informações sobre acordos formais.

- **Atributos**: `idContrato`, `dataInicio`, `dataFim`, `status`, `documento`

### **Interação**
Representa comunicação entre usuários.

- **Atributos**: `idInteracao`, `mensagem`, `dataEnvio`

### **Relações**
#### **Seguidor**
Rastreia conexões entre usuários.

- **Atributos**: `idSeguidor`, `dataInicio`

#### **Curtida**
Registra curtidas em postagens.

- **Atributos**: `idCurtida`, `data`

#### **Salvo**
Registra postagens guardadas.

- **Atributos**: `idSalvo`, `data`

### **Tag**
Permite categorizar postagens.

- **Atributos**: `idTag`, `nome`

### **Compartilhar**
Registra compartilhamentos de postagens.

- **Atributos**: `idCompartilhamento`, `data`, `redeDestino`

![Representação Visual da Arquitetura](../../static/img/image2.png)
