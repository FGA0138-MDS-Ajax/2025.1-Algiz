USE EcoNet_DB;

-- Limpa tabelas (opcional - só use se necessário para testes)
-- DELETE FROM JURIDICO;
-- DELETE FROM FISICO;
-- DELETE FROM USUARIO;

-- Inserção na tabela USUARIO (10 registros: 5 físicos, 5 jurídicos)

INSERT INTO USUARIO (emailUsuario, senha, fotoPerfil, bannerPerfil) VALUES

-- Pessoas físicas (5)
('joao.silva@email.com', 'ecoNet123', 'joao.jpg', 'banner_joao.jpg'),
('maria.souza@email.com', 'ecoNet123', 'maria.jpg', 'banner_maria.jpg'),
('carlos.pereira@email.com', 'ecoNet123', 'carlos.jpg', 'banner_carlos.jpg'),
('ana.oliveira@email.com', 'ecoNet123', 'ana.jpg', 'banner_ana.jpg'),
('lucas.santos@email.com', 'ecoNet123', 'lucas.jpg', 'banner_lucas.jpg'),

-- Empresas (5)
('reciclatech@empresa.com', 'ecoNet123', 'reciclatech.jpg', 'banner_reciclatech.jpg'),
('ecopaper@empresa.com', 'ecoNet123', 'ecopaper.jpg', 'banner_ecopaper.jpg'),
('sucatacenter@empresa.com', 'ecoNet123', 'sucatacenter.jpg', 'banner_sucatacenter.jpg'),
('verdemetal@empresa.com', 'ecoNet123', 'verdemetal.jpg', 'banner_verdemetal.jpg'),
('plastinovos@empresa.com', 'ecoNet123', 'plastinovos.jpg', 'banner_plastinovos.jpg');

-- Inserção na tabela FISICO (5 pessoas físicas)
INSERT INTO FISICO (
  cpfFisico, nomeFisico, sobrenomeFisico, telefonePessoa, estadoPessoa, sexo, dtNascimento, idUsuario
) VALUES
('111.222.333-01', 'João', 'Silva', '(11) 98765-4321', 'SP', 'Masculino', '1985-05-15', 1),
('222.333.444-02', 'Maria', 'Souza', '(21) 98765-4321', 'RJ', 'Feminino', '1990-08-20', 2),
('333.444.555-03', 'Carlos', 'Pereira', '(31) 98765-4321', 'MG', 'Masculino', '1978-11-03', 3),
('444.555.666-04', 'Ana', 'Oliveira', '(41) 98765-4321', 'PR', 'Feminino', '1995-02-28', 4),
('555.666.777-05', 'Lucas', 'Santos', '(51) 98765-4321', 'RS', 'Masculino', '1982-07-19', 5);

-- Inserção na tabela JURIDICO (5 empresas)
INSERT INTO JURIDICO (
  cnpjJuridico, razaoSocial, nomeComercial, telefoneEmpresa, estadoEmpresa, areaAtuacao, idUsuario
) VALUES
('12.345.678/0001-01', 'RECICLATECH SOLUCOES AMBIENTAIS LTDA', 'ReciclaTech', '(11) 98765-0001', 'SP', 'Reciclagem de plástico', 6),
('98.765.432/0001-02', 'ECOPAPER INDUSTRIA DE PAPEL SA', 'EcoPaper', '(21) 98765-0002', 'RJ', 'Reciclagem de papel', 7),
('45.678.901/0001-03', 'SUCATA CENTER COMERCIO DE MATERIAIS LTDA', 'SucataCenter', '(31) 98765-0003', 'MG', 'Compra/venda de metais', 8),
('65.432.198/0001-04', 'VERDE METAL RECICLADORA EIRELI', 'VerdeMetal', '(41) 98765-0004', 'PR', 'Reciclagem de metais', 9),
('78.901.234/0001-05', 'PLASTINOVOS INDUSTRIA E COMERCIO LTDA', 'PlastiNovos', '(51) 98765-0005', 'RS', 'Transformação de plásticos', 10);

-- Confirma todas as inserções
COMMIT;
