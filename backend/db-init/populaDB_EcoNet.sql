-- Arquivo para popular o banco de dados EcoNet_DB (testes)
-- Inicia uma transação para garantir integridade dos dados
USE EcoNet_DB;

-- Limpa tabelas (opcional - só use se necessário para testes)
-- DELETE FROM JURIDICO;
-- DELETE FROM FISICO;
-- DELETE FROM USUARIO;

-- Inserção na tabela USUARIO (20 registros)
INSERT INTO USUARIO (emailUsuario, senha, telefoneUsuario, estado) VALUES
-- Pessoas físicas (10)
('joao.silva@email.com', 1198765432, 'SP'),
('maria.souza@email.com', 2198765432, 'RJ'),
('carlos.pereira@email.com', 3198765432, 'MG'),
('ana.oliveira@email.com', 4198765432, 'PR'),
('lucas.santos@email.com', 5198765432, 'RS'),
('julia.ribeiro@email.com', 6198765432, 'DF'),
('pedro.almeida@email.com', 7198765432, 'BA'),
('fernanda.lima@email.com', 8198765432, 'PE'),
('rafael.costa@email.com', 9198765432, 'CE'),
('amanda.martins@email.com', 1098765432, 'SC'),

-- Empresas (10)
('reciclatech@empresa.com', 1198765001, 'SP'),
('ecopaper@empresa.com', 2198765002, 'RJ'),
('sucatacenter@empresa.com', 3198765003, 'MG'),
('verdemetal@empresa.com', 4198765004, 'PR'),
('plastinovos@empresa.com', 5198765005, 'RS'),
('madeiralegal@empresa.com', 6198765006, 'DF'),
('vidrobelo@empresa.com', 7198765007, 'BA'),
('eletrorecicle@empresa.com', 8198765008, 'PE'),
('organicossustentaveis@empresa.com', 9198765009, 'CE'),
('quimicaverde@empresa.com', 1098765010, 'SC');

-- Inserção na tabela FISICO (10 pessoas físicas)
INSERT INTO FISICO (cpfFisico, nomeFisico, sobrenomeFisico, sexo, dtNascimento, idUsuario) VALUES
(11122233301, 'João', 'Silva', 'M', '1985-05-15', 1),
(22233344402, 'Maria', 'Souza', 'F', '1990-08-20', 2),
(33344455503, 'Carlos', 'Pereira', 'M', '1978-11-03', 3),
(44455566604, 'Ana', 'Oliveira', 'F', '1995-02-28', 4),
(55566677705, 'Lucas', 'Santos', 'M', '1982-07-19', 5),
(66677788806, 'Julia', 'Ribeiro', 'F', '1993-04-10', 6),
(77788899907, 'Pedro', 'Almeida', 'M', '1975-09-22', 7),
(88899900008, 'Fernanda', 'Lima', 'F', '1988-12-05', 8),
(99900011109, 'Rafael', 'Costa', 'M', '1991-01-30', 9),
(00011122210, 'Amanda', 'Martins', 'F', '1997-06-14', 10);

-- Inserção na tabela JURIDICO (10 empresas)
INSERT INTO JURIDICO (cnpjJuridico, razaoSocial, nomeComercial, areaAtuacao, idUsuario) VALUES
-- Empresas fornecedoras (7)
('12345678000101', 'RECICLATECH SOLUCOES AMBIENTAIS LTDA', 'ReciclaTech', 'Reciclagem de plástico', 11),
('98765432000102', 'ECOPAPER INDUSTRIA DE PAPEL SA', 'EcoPaper', 'Reciclagem de papel', 12),
('45678901000103', 'SUCATA CENTER COMERCIO DE MATERIAIS LTDA', 'SucataCenter', 'Compra/venda de metais', 13),
('65432198000104', 'VERDE METAL RECICLADORA EIRELI', 'VerdeMetal', 'Reciclagem de metais', 14),
('78901234000105', 'PLASTINOVOS INDUSTRIA E COMERCIO LTDA', 'PlastiNovos', 'Transformação de plásticos', 15),
('89012345000106', 'MADEIRA LEGAL COMERCIO DE MADEIRAS LTDA', 'MadeiraLegal', 'Madeira sustentável', 16),
('90123456000107', 'VIDRO BELO RECICLAGEM LTDA', 'VidroBelo', 'Reciclagem de vidro', 17),

-- Empresas consumidoras (3)
('12378945000108', 'ELETRO RECICLE COMERCIO ELETRONICO LTDA', 'EletroRecicle', 'Eletrônicos sustentáveis', 18),
('98712365000109', 'ORGANICOS SUSTENTAVEIS AGRICOLA LTDA', 'OrganiSustent', 'Agricultura orgânica', 19),
('65498732000110', 'QUIMICA VERDE INDUSTRIA FARMACEUTICA SA', 'QuimicaVerde', 'Produtos químicos ecológicos', 20);

-- Confirma todas as inserções
COMMIT;

