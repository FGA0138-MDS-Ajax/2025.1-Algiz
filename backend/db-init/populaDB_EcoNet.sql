USE EcoNet_DB;

-- Limpa tabelas (opcional - só use se necessário para testes)
-- DELETE FROM postagem_tag;
-- DELETE FROM TAGS;
-- DELETE FROM compartilha;
-- DELETE FROM salva;
-- DELETE FROM curte;
-- DELETE FROM POSTAGENS;
-- DELETE FROM segue;
-- DELETE FROM JURIDICO;
-- DELETE FROM FISICO;
-- DELETE FROM USUARIO;

-- Inserção na tabela USUARIO (10 registros: 5 físicos, 5 jurídicos)
INSERT INTO USUARIO (emailUsuario, senha, telefoneUsuario, estado, fotoPerfil, bannerPerfil) VALUES
-- Pessoas físicas (5)
('joao.silva@email.com', 'ecoNet123', '(11) 98765-4321', 'SP', 'https://example.com/fotos/joao.jpg', 'https://example.com/banners/joao-banner.jpg'),
('maria.souza@email.com', 'ecoNet123', '(21) 98765-4321', 'RJ', 'https://example.com/fotos/maria.jpg', 'https://example.com/banners/maria-banner.jpg'),
('carlos.pereira@email.com', 'ecoNet123', '(31) 98765-4321', 'MG', 'https://example.com/fotos/carlos.jpg', 'https://example.com/banners/carlos-banner.jpg'),
('ana.oliveira@email.com', 'ecoNet123', '(41) 98765-4321', 'PR', 'https://example.com/fotos/ana.jpg', 'https://example.com/banners/ana-banner.jpg'),
('lucas.santos@email.com', 'ecoNet123', '(51) 98765-4321', 'RS', 'https://example.com/fotos/lucas.jpg', 'https://example.com/banners/lucas-banner.jpg'),

-- Empresas (5)
('reciclatech@empresa.com', 'ecoNet123', '(11) 98765-0001', 'SP', 'https://example.com/logos/reciclatech.jpg', 'https://example.com/banners/reciclatech-banner.jpg'),
('ecopaper@empresa.com', 'ecoNet123', '(21) 98765-0002', 'RJ', 'https://example.com/logos/ecopaper.jpg', 'https://example.com/banners/ecopaper-banner.jpg'),
('sucatacenter@empresa.com', 'ecoNet123', '(31) 98765-0003', 'MG', 'https://example.com/logos/sucatacenter.jpg', 'https://example.com/banners/sucatacenter-banner.jpg'),
('verdemetal@empresa.com', 'ecoNet123', '(41) 98765-0004', 'PR', 'https://example.com/logos/verdemetal.jpg', 'https://example.com/banners/verdemetal-banner.jpg'),
('plastinovos@empresa.com', 'ecoNet123', '(51) 98765-0005', 'RS', 'https://example.com/logos/plastinovos.jpg', 'https://example.com/banners/plastinovos-banner.jpg');

-- Inserção na tabela FISICO (5 pessoas físicas)
INSERT INTO FISICO (cpfFisico, nomeFisico, sobrenomeFisico, sexo, dtNascimento, idUsuario) VALUES
('111.222.333-01', 'João', 'Silva', 'Masculino', '1985-05-15', 1),
('222.333.444-02', 'Maria', 'Souza', 'Feminino', '1990-08-20', 2),
('333.444.555-03', 'Carlos', 'Pereira', 'Masculino', '1978-11-03', 3),
('444.555.666-04', 'Ana', 'Oliveira', 'Feminino', '1995-02-28', 4),
('555.666.777-05', 'Lucas', 'Santos', 'Masculino', '1982-07-19', 5);

-- Inserção na tabela JURIDICO (5 empresas)
INSERT INTO JURIDICO (cnpjJuridico, razaoSocial, nomeComercial, areaAtuacao, idUsuario) VALUES
('12.345.678/0001-01', 'RECICLATECH SOLUCOES AMBIENTAIS LTDA', 'ReciclaTech', 'Reciclagem de plástico', 6),
('98.765.432/0001-02', 'ECOPAPER INDUSTRIA DE PAPEL SA', 'EcoPaper', 'Reciclagem de papel', 7),
('45.678.901/0001-03', 'SUCATA CENTER COMERCIO DE MATERIAIS LTDA', 'SucataCenter', 'Compra/venda de metais', 8),
('65.432.198/0001-04', 'VERDE METAL RECICLADORA EIRELI', 'VerdeMetal', 'Reciclagem de metais', 9),
('78.901.234/0001-05', 'PLASTINOVOS INDUSTRIA E COMERCIO LTDA', 'PlastiNovos', 'Transformação de plásticos', 10);

-- Inserção na tabela segue (relacionamentos de seguir)
INSERT INTO segue (idUsuario, idUsuarioSeguido, dtInicio) VALUES
(1, 6, '2023-01-15 10:00:00'),  -- João segue ReciclaTech
(2, 7, '2023-02-20 11:30:00'),  -- Maria segue EcoPaper
(3, 8, '2023-03-10 09:15:00'),  -- Carlos segue SucataCenter
(4, 9, '2023-04-05 14:20:00'),  -- Ana segue VerdeMetal
(5, 10, '2023-05-12 16:45:00'), -- Lucas segue PlastiNovos
(6, 1, '2023-06-18 13:10:00');  -- ReciclaTech segue João

-- Inserção na tabela TAGS
INSERT INTO TAGS (nomeTag) VALUES
('plástico'),
('papel'),
('metal'),
('vidro'),
('madeira'),
('eletrônicos'),
('orgânicos'),
('têxtil');

-- Inserção na tabela POSTAGENS
INSERT INTO POSTAGENS (idPost, idUsuario, conteudo, imagemURL, tipo, criado_em) VALUES
(1, 6, 'Temos 500kg de garrafas PET disponíveis para reciclagem. Interessados entrar em contato!', 'https://example.com/imagens/pet.jpg', 'oferta', '2023-01-10 09:00:00'),
(2, 7, 'Procuramos aparas de papel branco para reciclagem. Pagamos bem!', NULL, 'demanda', '2023-02-15 14:30:00'),
(3, 1, 'Estou doando roupas usadas em bom estado. Interessados podem retirar em SP capital.', 'https://example.com/imagens/roupas.jpg', 'oferta', '2023-03-20 10:15:00'),
(4, 8, 'Vendemos sucata de alumínio limpa. R$ 5,00/kg. Entrega em MG.', NULL, 'oferta', '2023-04-25 16:45:00'),
(5, 2, 'Preciso de embalagens plásticas limpas para projeto de upcycling. Alguém pode ajudar?', 'https://example.com/imagens/embalagens.jpg', 'demanda', '2023-05-30 11:20:00');

-- Inserção na tabela postagem_tag (relacionamento entre postagens e tags)
INSERT INTO postagem_tag (idPost, idTag) VALUES
(1, 1),  -- PET -> plástico
(2, 2),  -- Papel branco -> papel
(3, 8),  -- Roupas -> têxtil
(4, 3),  -- Sucata de alumínio -> metal
(5, 1);  -- Embalagens plásticas -> plástico

-- Inserção na tabela curte (likes em postagens)
INSERT INTO curte (idUsuario, idPost, curtido_em) VALUES
(1, 1, '2023-01-10 10:30:00'),  -- João curte post da ReciclaTech
(2, 1, '2023-01-11 09:15:00'),  -- Maria curte post da ReciclaTech
(3, 2, '2023-02-16 11:00:00'),  -- Carlos curte post da EcoPaper
(6, 3, '2023-03-21 14:20:00'),  -- ReciclaTech curte post do João
(7, 5, '2023-05-31 10:45:00');  -- EcoPaper curte post da Maria

-- Inserção na tabela salva (posts salvos)
INSERT INTO salva (idUsuario, idPost, salvo_em) VALUES
(1, 2, '2023-02-16 15:30:00'),  -- João salva post da EcoPaper
(4, 1, '2023-01-12 11:20:00'),  -- Ana salva post da ReciclaTech
(5, 4, '2023-04-26 09:45:00'),  -- Lucas salva post da SucataCenter
(9, 5, '2023-06-01 13:10:00');  -- VerdeMetal salva post da Maria

-- Inserção na tabela compartilha (compartilhamentos)
INSERT INTO compartilha (idUsuario, idPost, redeDestino, compartilhado_em) VALUES
(2, 1, 'WhatsApp', '2023-01-11 16:20:00'),  -- Maria compartilha post no WhatsApp
(3, 4, 'LinkedIn', '2023-04-26 10:30:00'),  -- Carlos compartilha post no LinkedIn
(6, 5, 'Facebook', '2023-05-31 14:15:00');  -- ReciclaTech compartilha post no Facebook

-- Confirma todas as inserções
COMMIT;