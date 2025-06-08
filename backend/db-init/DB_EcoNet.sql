-- Arquivo de inicialização e criação do banco de dados e suas tabelas
--
-- Comando de criação do banco de dados
-- Executar apenas uma vez
CREATE DATABASE IF NOT EXISTS EcoNet_DB;

-- Comando de criação das tabelas
CREATE TABLE IF NOT EXISTS USUARIO (
    idUsuario       INT         NOT NULL    AUTO_INCREMENT,
    emailUsuario    VARCHAR(255)NOT NULL    UNIQUE,
    senha           VARCHAR(255)NOT NULL,
    telefoneUsuario VARCHAR(20) NOT NULL,
    estado          VARCHAR(255)NOT NULL,
    fotoPerfil      VARCHAR(255)    NULL,
    bannerPerfil    VARCHAR(255)    NULL,
    PRIMARY KEY (idUsuario)
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS FISICO (
    cpfFisico       VARCHAR(14)     NOT NULL,
    nomeFisico      VARCHAR(255)    NOT NULL,
    sobrenomeFisico VARCHAR(255)    NOT NULL,
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
    areaAtuacao     VARCHAR(255)NOT NULL,
    idUsuario       INT         NOT NULL,
    PRIMARY KEY (cnpjJuridico),
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS segue (
    idUsuario           INT         NOT NULL,
    idUsuarioSeguido    INT         NOT NULL,
    dtInicio            DATETIME    NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario),
    FOREIGN KEY (idUsuarioSeguido) REFERENCES USUARIO(idUsuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS POSTAGENS (
    idPost      INT                         NOT NULL,
    idUsuario   INT                         NOT NULL,
    conteudo    TEXT                        NOT NULL,
    imagemURL   VARCHAR,
    tipo        ENUM('oferta', 'demanda')   NOT NULL,
    criado_em  DATETIME                    NOT NULL,
    PRIMARY KEY (idPost),
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS curte (
    idUsuario   INT         NOT NULL,
    idPost      INT         NOT NULL,
    curtido_em  DATETIME    NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario),
    FOREIGN KEY (idPost) REFERENCES POSTAGENS(idPost)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS salva (
    idUsuario   INT         NOT NULL,
    idPost      INT         NOT NULL,
    salvo_em    DATETIME    NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario),
    FOREIGN KEY (idPost) REFERENCES POSTAGENS(idPost)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS compartilha (
    idUsuario           INT         NOT NULL,
    idPost              INT         NOT NULL,
    redeDestino         VARCHAR     NOT NULL,
    compartilhado_em    DATETIME    NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario),
    FOREIGN KEY (idPost) REFERENCES POSTAGENS(idPost)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS TAGS (
    idTag   INT     NOT NULL    AUTO_INCREMENT,
    nomeTag VARCHAR NOT NULL,
    PRIMARY KEY (idTag)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS postagem_tag (
    idPost  INT NOT NULL,
    idTag   INT NOT NULL,
    FOREIGN KEY (idPost) REFERENCES POSTAGENS(idPost),
    FOREIGN KEY (idTag) REFERENCES TAGS(idTag)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)ENGINE=INNODB;