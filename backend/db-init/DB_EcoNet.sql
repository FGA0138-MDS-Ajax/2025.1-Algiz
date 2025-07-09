CREATE DATABASE IF NOT EXISTS EcoNet_DB;
USE EcoNet_DB;

-- ===== TABELA DE USUÁRIOS =====
CREATE TABLE IF NOT EXISTS USUARIO (
    idUsuario           INT             NOT NULL    AUTO_INCREMENT,
    emailUsuario        VARCHAR(255)    NOT NULL    UNIQUE,
    senha               VARCHAR(255)    NOT NULL,
    fotoPerfil          VARCHAR(500),
    bannerPerfil        VARCHAR(500),
    reset_code          VARCHAR(6),
    reset_code_expires_at DATETIME NULL,
    PRIMARY KEY (idUsuario)
) ENGINE=INNODB;

-- ===== TABELA DE PESSOAS FÍSICAS =====
CREATE TABLE IF NOT EXISTS FISICO (
    cpfFisico       VARCHAR(14)     NOT NULL,
    nomeFisico      VARCHAR(255)    NOT NULL,
    sobrenomeFisico VARCHAR(255)    NOT NULL,
    telefoneFisico  VARCHAR(20)     NOT NULL,
    estadoFisico    VARCHAR(255)    NOT NULL,
    sexo            VARCHAR(17)     NOT NULL,
    dtNascimento    DATE            NOT NULL,
    idUsuario       INT             NOT NULL,
    PRIMARY KEY (cpfFisico),
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB;

-- ===== TABELA DE EMPRESAS (JURIDICO) - ATUALIZADA =====
CREATE TABLE IF NOT EXISTS JURIDICO (
    idEmpresa           INT             NOT NULL    AUTO_INCREMENT,
    cnpjJuridico        VARCHAR(18)     NOT NULL    UNIQUE,
    razaoSocial         VARCHAR(255)    NOT NULL,
    nomeComercial       VARCHAR(255)    NOT NULL    UNIQUE,
    telefoneJuridico    VARCHAR(20)     NOT NULL,
    estadoJuridico      VARCHAR(255)    NOT NULL,
    enderecoJuridico    VARCHAR(255)    NOT NULL,
    areaAtuacao         VARCHAR(255)    NOT NULL,
    fotoEmpresa         VARCHAR(500),
    bannerEmpresa       VARCHAR(500),
    descricaoEmpresa    TEXT             NULL,
    idUsuario           INT             NOT NULL,
    PRIMARY KEY (idEmpresa),
    UNIQUE KEY uk_cnpj (cnpjJuridico),
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB;

-- ===== TABELA DE VÍNCULOS ENTRE EMPRESAS E PESSOAS FÍSICAS =====
CREATE TABLE IF NOT EXISTS VINCULO_JURIDICO_FISICO (
    id              INT             NOT NULL    AUTO_INCREMENT,
    cpfFisico       VARCHAR(14)     NOT NULL,
    idEmpresa       INT             NOT NULL,                       -- ✅ ALTERADO: usar idEmpresa
    cargo           VARCHAR(255)                NULL,
    dataVinculo     DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    ativo           BOOLEAN         NOT NULL    DEFAULT TRUE,
    PRIMARY KEY (id),
    UNIQUE KEY uk_vinculo (cpfFisico, idEmpresa),                  -- ✅ ALTERADO
    FOREIGN KEY (cpfFisico) REFERENCES FISICO(cpfFisico)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (idEmpresa) REFERENCES JURIDICO(idEmpresa)         -- ✅ ALTERADO
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB;

-- ===== TABELA DE SEGUIDORES =====
CREATE TABLE IF NOT EXISTS FISICO_SEGUE_JURIDICO (
    cpfFisico       VARCHAR(14)     NOT NULL,
    idEmpresa       INT             NOT NULL,                       -- ✅ ALTERADO: usar idEmpresa
    dtInicio        DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cpfFisico, idEmpresa),                            -- ✅ ALTERADO
    FOREIGN KEY (cpfFisico) REFERENCES FISICO(cpfFisico)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (idEmpresa) REFERENCES JURIDICO(idEmpresa)         -- ✅ ALTERADO
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB; 

-- ===== TABELA DE POSTAGENS - ATUALIZADA PARA USAR idEmpresa =====
CREATE TABLE IF NOT EXISTS POSTAGENS (
    idPost          INT             NOT NULL    AUTO_INCREMENT,
    titulo          VARCHAR(255)    NOT NULL,
    idEmpresa       INT             NOT NULL,                       -- ✅ ALTERADO: usar idEmpresa
    conteudo        TEXT            NOT NULL,
    imagemURL       VARCHAR(500),
    tipo            ENUM('doacao', 'oferta', 'demanda') NOT NULL,
    criado_em       DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idPost),
    FOREIGN KEY (idEmpresa) REFERENCES JURIDICO(idEmpresa)         -- ✅ ALTERADO
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB;

-- ===== TABELA DE CURTIDAS =====
CREATE TABLE IF NOT EXISTS CURTE (
    idUsuario   INT         NOT NULL,
    idPost      INT         NOT NULL,
    curtido_em  DATETIME    NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idUsuario, idPost),
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (idPost) REFERENCES POSTAGENS(idPost)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB;

-- ===== TABELA DE POSTS SALVOS =====
CREATE TABLE IF NOT EXISTS SALVA (
    idUsuario   INT         NOT NULL,
    idPost      INT         NOT NULL,
    salvo_em    DATETIME    NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idUsuario, idPost),
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (idPost) REFERENCES POSTAGENS(idPost)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB;

-- ===== TABELA DE COMPARTILHAMENTOS =====
CREATE TABLE IF NOT EXISTS COMPARTILHA (
    idUsuario           INT         NOT NULL,
    idPost              INT         NOT NULL,
    redeDestino         VARCHAR(255) NOT NULL,
    compartilhado_em    DATETIME    NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idUsuario, idPost, redeDestino),
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (idPost) REFERENCES POSTAGENS(idPost)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB;

-- ===== TABELA DE TAGS =====
CREATE TABLE IF NOT EXISTS TAGS (
    idTag       INT             NOT NULL    AUTO_INCREMENT,
    nome        VARCHAR(50)     NOT NULL    UNIQUE,
    cor         VARCHAR(7)      NOT NULL    DEFAULT '#3B82F6',
    PRIMARY KEY (idTag)
) ENGINE=INNODB;

-- ===== TABELA DE RELACIONAMENTO POSTAGEM-TAG =====
CREATE TABLE IF NOT EXISTS POSTAGEM_TAG (
    idPost  INT NOT NULL,
    idTag   INT NOT NULL,
    PRIMARY KEY (idPost, idTag),
    FOREIGN KEY (idPost) REFERENCES POSTAGENS(idPost)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (idTag) REFERENCES TAGS(idTag)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB;

-- ===== TABELA DE SOLICITAÇÕES DE VÍNCULO =====
CREATE TABLE IF NOT EXISTS SOLICITACAO_VINCULO (
    idSolicitacao   INT             NOT NULL    AUTO_INCREMENT,
    cpfFisico       VARCHAR(14)     NOT NULL,
    idEmpresa       INT             NOT NULL,                       -- ✅ ALTERADO: usar idEmpresa
    cargoProposto   VARCHAR(255),
    mensagem        TEXT,
    status          ENUM('pendente', 'aceito', 'recusado') DEFAULT 'pendente',
    criada_em       DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    respondida_em   DATETIME,
    PRIMARY KEY (idSolicitacao),
    FOREIGN KEY (cpfFisico) REFERENCES FISICO(cpfFisico)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (idEmpresa) REFERENCES JURIDICO(idEmpresa)         -- ✅ ALTERADO
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB;

-- ===== TABELA DE NOTIFICAÇÕES =====
CREATE TABLE IF NOT EXISTS NOTIFICACAO_FISICO (
    idNotificacao INT             NOT NULL    AUTO_INCREMENT,
    cpfFisico     VARCHAR(14)     NOT NULL,
    tipo          ENUM('solicitacao_vinculo', 'informacao', 'alerta') NOT NULL,
    idReferencia  INT,
    mensagem      TEXT            NOT NULL,
    lida          BOOLEAN         NOT NULL    DEFAULT FALSE,
    criada_em     DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idNotificacao),
    FOREIGN KEY (cpfFisico) REFERENCES FISICO(cpfFisico)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB;

-- ===== TABELA DE MENSAGENS =====
CREATE TABLE IF NOT EXISTS MENSAGEM (
    idMensagem      INT             NOT NULL    AUTO_INCREMENT,
    idRemetente     INT             NOT NULL,
    idDestinatario  INT             NOT NULL,
    conteudo        TEXT            NOT NULL,
    enviada_em      DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    visualizada     BOOLEAN         NOT NULL    DEFAULT FALSE,
    PRIMARY KEY (idMensagem),
    FOREIGN KEY (idRemetente) REFERENCES USUARIO(idUsuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (idDestinatario) REFERENCES USUARIO(idUsuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB;

-- ===== TABELA DE CONTRATOS =====
CREATE TABLE IF NOT EXISTS CONTRATO (
    idContrato      INT             NOT NULL    AUTO_INCREMENT,
    idEmpresaFornecedor  INT        NOT NULL,                       -- ✅ ALTERADO: usar idEmpresa
    idEmpresaReceptor    INT        NOT NULL,                       -- ✅ ALTERADO: usar idEmpresa
    tituloContrato  VARCHAR(255)    NOT NULL,
    descricao       TEXT,
    arquivoURL      VARCHAR(500),
    status          ENUM('ativo', 'inativo', 'cancelado') DEFAULT 'ativo',
    criado_em       DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idContrato),
    FOREIGN KEY (idEmpresaFornecedor) REFERENCES JURIDICO(idEmpresa) -- ✅ ALTERADO
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (idEmpresaReceptor) REFERENCES JURIDICO(idEmpresa)   -- ✅ ALTERADO
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB;

-- ===== TABELA DE ÁREAS DE ATUAÇÃO =====
CREATE TABLE IF NOT EXISTS AREA_ATUACAO (
    idAreaAtuacao       INT         NOT NULL    AUTO_INCREMENT,
    nomeAreaAtuacao     VARCHAR(50) NOT NULL    UNIQUE,
    PRIMARY KEY (idAreaAtuacao)
) ENGINE=INNODB;

-- ===== TABELA DE RELACIONAMENTO USUÁRIO-ÁREA =====
CREATE TABLE IF NOT EXISTS USUARIO_AREA_ATUACAO (
    idAreaAtuacao   INT NOT NULL,
    idUsuario       INT NOT NULL,
    PRIMARY KEY (idAreaAtuacao, idUsuario),
    FOREIGN KEY (idAreaAtuacao) REFERENCES AREA_ATUACAO(idAreaAtuacao)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB;

-- ===== TABELA DE COMENTÁRIOS =====
CREATE TABLE IF NOT EXISTS COMENTARIO (
    idComentario    INT             NOT NULL    AUTO_INCREMENT,
    idUsuario       INT             NOT NULL,
    idPost          INT             NOT NULL,
    texto           TEXT            NOT NULL,
    criado_em       DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idComentario),
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (idPost) REFERENCES POSTAGENS(idPost)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB;

-- ===== INSERÇÃO DE DADOS INICIAIS =====

-- Inserir tags padrão
INSERT IGNORE INTO TAGS (nome, cor) VALUES 
('Sustentabilidade', '#22C55E'),
('Reciclagem', '#3B82F6'),
('Economia Circular', '#8B5CF6'),
('Meio Ambiente', '#10B981'),
('Resíduos', '#F59E0B'),
('Energia Renovável', '#EF4444'),
('Agricultura Sustentável', '#84CC16'),
('Tecnologia Verde', '#06B6D4'),
('Logística Reversa', '#F97316'),
('Compostagem', '#65A30D');

-- Inserir áreas de atuação padrão
INSERT IGNORE INTO AREA_ATUACAO (nomeAreaAtuacao) VALUES 
('Tecnologia'),
('Agricultura'),
('Indústria'),
('Serviços'),
('Comércio'),
('Construção'),
('Energia'),
('Transporte'),
('Alimentação'),
('Educação'),
('Saúde'),
('Turismo');