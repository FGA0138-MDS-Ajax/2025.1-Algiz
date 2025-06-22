CREATE DATABASE IF NOT EXISTS EcoNet_DB;

CREATE TABLE IF NOT EXISTS USUARIO (
    idUsuario       INT         NOT NULL    AUTO_INCREMENT,
    emailUsuario    VARCHAR(255)NOT NULL    UNIQUE,
    senha           VARCHAR(255)NOT NULL,
    fotoPerfil      VARCHAR(255)    NULL,
    bannerPerfil    VARCHAR(255)    NULL,
    PRIMARY KEY (idUsuario)
)ENGINE=INNODB;

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
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS JURIDICO (
    cnpjJuridico    VARCHAR(18) NOT NULL,
    razaoSocial     VARCHAR(255)NOT NULL,
    nomeComercial   VARCHAR(255)NOT NULL    UNIQUE,
    telefoneJuridico VARCHAR(20) NOT NULL,
    estadoJuridico   VARCHAR(255)NOT NULL,
    enderecoJuridico   VARCHAR(255)NOT NULL,
    areaAtuacao     VARCHAR(255)NOT NULL,
    idUsuario       INT         NOT NULL,
    PRIMARY KEY (cnpjJuridico),
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS VINCULO_JURIDICO_FISICO (
    id             INT           NOT NULL AUTO_INCREMENT,
    cpfFisico      VARCHAR(14)   NOT NULL,
    cnpjJuridico   VARCHAR(18)   NOT NULL,
    cargo          VARCHAR(255)      NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (cpfFisico) REFERENCES FISICO(cpfFisico)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (cnpjJuridico) REFERENCES JURIDICO(cnpjJuridico)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS FISICO_SEGUE_JURIDICO (
    cpfFisico       VARCHAR(14)     NOT NULL,
    cnpjJuridico    VARCHAR(18)     NOT NULL,
    dtInicio        DATETIME        NOT NULL,
    PRIMARY KEY (cpfFisico, cnpjJuridico),
    FOREIGN KEY (cpfFisico) REFERENCES FISICO(cpfFisico)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (cnpjJuridico) REFERENCES JURIDICO(cnpjJuridico)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB; 

CREATE TABLE IF NOT EXISTS POSTAGENS (
    idPost        INT NOT NULL AUTO_INCREMENT,
    cnpjJuridico  VARCHAR(18) NOT NULL,
    conteudo      TEXT NOT NULL,
    imagemURL     VARCHAR(255),
    tipo          ENUM('doacao', 'oferta', 'demanda') NOT NULL,
    criado_em     DATETIME NOT NULL,
    PRIMARY KEY (idPost),
    FOREIGN KEY (cnpjJuridico) REFERENCES JURIDICO(cnpjJuridico)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS CURTE (
    idUsuario   INT         NOT NULL,
    idPost      INT         NOT NULL,
    curtido_em  DATETIME    NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario),
    FOREIGN KEY (idPost) REFERENCES POSTAGENS(idPost)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS SALVA (
    idUsuario   INT         NOT NULL,
    idPost      INT         NOT NULL,
    salvo_em    DATETIME    NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario),
    FOREIGN KEY (idPost) REFERENCES POSTAGENS(idPost)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS COMPARTILHA (
    idUsuario           INT         NOT NULL,
    idPost              INT         NOT NULL,
    redeDestino         VARCHAR(255) NOT NULL,
    compartilhado_em    DATETIME    NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario),
    FOREIGN KEY (idPost) REFERENCES POSTAGENS(idPost)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS TAGS (
    idTag      INT          NOT NULL AUTO_INCREMENT,
    nomeTag    VARCHAR(255) NOT NULL,
    corFundo   VARCHAR(20)  DEFAULT '#CCCCCC',
    PRIMARY KEY (idTag)
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS POSTAGEM_TAG (
    idPost  INT NOT NULL,
    idTag   INT NOT NULL,
    FOREIGN KEY (idPost) REFERENCES POSTAGENS(idPost),
    FOREIGN KEY (idTag) REFERENCES TAGS(idTag)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS SOLICITACAO_VINCULO (
    idSolicitacao   INT AUTO_INCREMENT PRIMARY KEY,
    cpfFisico       VARCHAR(14) NOT NULL,
    cnpjJuridico    VARCHAR(18) NOT NULL,
    cargoProposto   VARCHAR(255),
    mensagem        TEXT,
    status          ENUM('pendente', 'aceito', 'recusado') DEFAULT 'pendente',
    criada_em       DATETIME DEFAULT CURRENT_TIMESTAMP,
    respondida_em   DATETIME,
    FOREIGN KEY (cpfFisico) REFERENCES FISICO(cpfFisico)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (cnpjJuridico) REFERENCES JURIDICO(cnpjJuridico)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS NOTIFICACAO_FISICO (
    idNotificacao INT AUTO_INCREMENT PRIMARY KEY,
    cpfFisico     VARCHAR(14) NOT NULL,
    tipo          ENUM('solicitacao_vinculo', 'informacao', 'alerta') NOT NULL,
    idReferencia  INT,  -- Referencia a solicitação de vínculo (por ex.)
    mensagem      TEXT NOT NULL,
    lida          BOOLEAN DEFAULT FALSE,
    criada_em     DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cpfFisico) REFERENCES FISICO(cpfFisico)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS MENSAGEM (
    idMensagem    INT AUTO_INCREMENT PRIMARY KEY,
    idRemetente   INT NOT NULL,           -- Quem mandou
    idDestinatario INT NOT NULL,          -- Para quem foi
    conteudo      TEXT NOT NULL,
    enviada_em    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    visualizada   BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (idRemetente) REFERENCES USUARIO(idUsuario),
    FOREIGN KEY (idDestinatario) REFERENCES USUARIO(idUsuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS CONTRATO (
    idContrato         INT AUTO_INCREMENT PRIMARY KEY,
    cnpjFornecedor     VARCHAR(18) NOT NULL,  
    cnpjReceptor       VARCHAR(18) NOT NULL,  
    tituloContrato     VARCHAR(255) NOT NULL,
    descricao          TEXT,
    arquivoURL         VARCHAR(255),          
    status             ENUM('ativo', 'inativo', 'cancelado') DEFAULT 'ativo',
    criado_em          DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cnpjFornecedor) REFERENCES JURIDICO(cnpjJuridico)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (cnpjReceptor) REFERENCES JURIDICO(cnpjJuridico)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS AREA_ATUACAO (
    idAreaAtuacao       INT         NOT NULL    AUTO_INCREMENT,
    nomeAreaAtuacao   VARCHAR(50) NOT NULL,
    PRIMARY KEY (idAreaAtuacao)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS possui (
    idAreaAtuacao   INT NOT NULL,
    idUsuario       INT NOT NULL,
    PRIMARY KEY (idAreaAtuacao),
    PRIMARY KEY (idUsuario),
    FOREIGN KEY (idAreaAtuacao) REFERENCES AREA_ATUACAO(idAreaAtuacao),
    ON DELETE CASCADE
    ON UPDATE CASCADE
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario),
    ON DELETE CASCADE
    ON UPDATE CASCADE
)ENGINE=INNODB;