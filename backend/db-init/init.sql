-- Arquivo de inicialização e criação do banco de dados e suas tabelas
--
-- Comando de criação do banco de dados
-- Executar apenas uma vez
CREATE DATABASE IF NOT EXISTS EcoNet_DB;

-- Comando de criação das tabelas
CREATE TABLE IF NOT EXISTS USUARIO (
    idUsuario       INT         NOT NULL    AUTO_INCREMENT,
    emailUsuario    VARCHAR(255)NOT NULL    UNIQUE,
    telefoneUsuario INT         NOT NULL,
    estado          VARCHAR(255)NOT NULL,
    PRIMARY KEY (idUsuario)
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS FISICO (
    cpfFisico       INT(11)         NOT NULL,
    nomeFisico      VARCHAR(255)    NOT NULL,
    sobrenomeFisico VARCHAR(255)    NOT NULL,
    sexo            CHAR(1)   NOT NULL,
    dtNascimento    DATE            NOT NULL,
    idUsuario       INT             NOT NULL,
    PRIMARY KEY (cpfFisico),
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS JURIDICO (
    cnpjJuridico    VARCHAR(14) NOT NULL,
    razaoSocial     VARCHAR(255)NOT NULL,
    nomeComercial   VARCHAR(255)NOT NULL    UNIQUE,
    areaAtuacao     VARCHAR(255)NOT NULL,
    idUsuario       INT         NOT NULL,
    PRIMARY KEY (cnpjJuridico),
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)ENGINE=INNODB;