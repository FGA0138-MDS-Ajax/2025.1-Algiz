USE EcoNet_DB;

-- Limpa tabelas (opcional - só use se necessário para testes)
-- DELETE FROM JURIDICO;
-- DELETE FROM FISICO;
-- DELETE FROM USUARIO;

-- Inserção na tabela USUARIO (10 registros: 5 físicos, 5 jurídicos)
INSERT INTO USUARIO (emailUsuario, senha, telefoneUsuario, estado) VALUES
-- Pessoas físicas (5)
('joao.silva@email.com', 'ecoNet123', 1198765432, 'SP'),
('maria.souza@email.com', 'ecoNet123', 2198765432, 'RJ'),
('carlos.pereira@email.com', 'ecoNet123', 3198765432, 'MG'),
('ana.oliveira@email.com', 'ecoNet123', 4198765432, 'PR'),
('lucas.santos@email.com', 'ecoNet123', 5198765432, 'RS'),

-- Empresas (5)
('reciclatech@empresa.com', 'ecoNet123', 1198765001, 'SP'),
('ecopaper@empresa.com', 'ecoNet123', 2198765002, 'RJ'),
('sucatacenter@empresa.com', 'ecoNet123', 3198765003, 'MG'),
('verdemetal@empresa.com', 'ecoNet123', 4198765004, 'PR'),
('plastinovos@empresa.com', 'ecoNet123', 5198765005, 'RS');

-- Inserção na tabela FISICO (5 pessoas físicas)
INSERT INTO FISICO (cpfFisico, nomeFisico, sobrenomeFisico, sexo, dtNascimento, idUsuario) VALUES
('11122233301', 'João', 'Silva', 'M', '1985-05-15', 1),
('22233344402', 'Maria', 'Souza', 'F', '1990-08-20', 2),
('33344455503', 'Carlos', 'Pereira', 'M', '1978-11-03', 3),
('44455566604', 'Ana', 'Oliveira', 'F', '1995-02-28', 4),
('55566677705', 'Lucas', 'Santos', 'M', '1982-07-19', 5);

-- Inserção na tabela JURIDICO (5 empresas)
INSERT INTO JURIDICO (cnpjJuridico, razaoSocial, nomeComercial, areaAtuacao, idUsuario) VALUES
('12345678000101', 'RECICLATECH SOLUCOES AMBIENTAIS LTDA', 'ReciclaTech', 'Reciclagem de plástico', 6),
('98765432000102', 'ECOPAPER INDUSTRIA DE PAPEL SA', 'EcoPaper', 'Reciclagem de papel', 7),
('45678901000103', 'SUCATA CENTER COMERCIO DE MATERIAIS LTDA', 'SucataCenter', 'Compra/venda de metais', 8),
('65432198000104', 'VERDE METAL RECICLADORA EIRELI', 'VerdeMetal', 'Reciclagem de metais', 9),
('78901234000105', 'PLASTINOVOS INDUSTRIA E COMERCIO LTDA', 'PlastiNovos', 'Transformação de plásticos', 10);

-- Confirma todas as inserções
COMMIT;
