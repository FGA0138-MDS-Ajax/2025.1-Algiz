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

-- Inserção na tabela FISICO (5 pessoas físicas)
INSERT INTO FISICO (
  cpfFisico, nomeFisico, sobrenomeFisico, telefoneFisico, estadoFisico, sexo, dtNascimento, idUsuario
) VALUES
('111.222.333-01', 'João', 'Silva', '(11) 98765-4321', 'SP', 'Masculino', '1985-05-15', 1),
('222.333.444-02', 'Maria', 'Souza', '(21) 98765-4321', 'RJ', 'Feminino', '1990-08-20', 2),
('333.444.555-03', 'Carlos', 'Pereira', '(31) 98765-4321', 'MG', 'Masculino', '1978-11-03', 3),
('444.555.666-04', 'Ana', 'Oliveira', '(41) 98765-4321', 'PR', 'Feminino', '1995-02-28', 4),
('555.666.777-05', 'Lucas', 'Santos', '(51) 98765-4321', 'RS', 'Masculino', '1982-07-19', 5);

-- Inserção na tabela JURIDICO (5 empresas)
INSERT INTO JURIDICO (
  cnpjJuridico, razaoSocial, nomeComercial, telefoneJuridico, estadoJuridico, enderecoJuridico, areaAtuacao, idUsuario
) VALUES
('12.345.678/0001-01', 'RECICLATECH SOLUCOES AMBIENTAIS LTDA', 'ReciclaTech', '(11) 98765-0001', 'SP', 'Rua da Reciclagem, 123', 'Reciclagem de plástico', 1),
('98.765.432/0001-02', 'ECOPAPER INDUSTRIA DE PAPEL SA', 'EcoPaper', '(21) 98765-0002', 'RJ', 'Avenida do Papel, 456', 'Reciclagem de papel', 2),
('45.678.901/0001-03', 'SUCATA CENTER COMERCIO DE MATERIAIS LTDA', 'SucataCenter', '(31) 98765-0003', 'MG', 'Praça da Sucata, 789', 'Compra/venda de metais', 3),
('65.432.198/0001-04', 'VERDE METAL RECICLADORA EIRELI', 'VerdeMetal', '(41) 98765-0004', 'PR', 'Rua do Metal, 101', 'Reciclagem de metais', 4),
('78.901.234/0001-05', 'PLASTINOVOS INDUSTRIA E COMERCIO LTDA', 'PlastiNovos', '(51) 98765-0005', 'RS', 'Avenida dos Plásticos, 202', 'Transformação de plásticos', 5);

-- Vínculos (já incluído no seu arquivo)
INSERT INTO VINCULO_JURIDICO_FISICO (cpfFisico, cnpjJuridico, cargo) VALUES
('111.222.333-01', '12.345.678/0001-01', 'Analista Ambiental'),
('222.333.444-02', '98.765.432/0001-02', 'Engenheira de Processos'),
('333.444.555-03', '45.678.901/0001-03', 'Gerente de Operações'),
('444.555.666-04', '65.432.198/0001-04', 'Assistente Técnica'),
('555.666.777-05', '78.901.234/0001-05', 'Supervisor de Logística');

-- Físicos seguem jurídicos
INSERT INTO FISICO_SEGUE_JURIDICO (cpfFisico, cnpjJuridico, dtInicio) VALUES
('111.222.333-01', '98.765.432/0001-02', NOW()),
('222.333.444-02', '45.678.901/0001-03', NOW()),
('333.444.555-03', '65.432.198/0001-04', NOW()),
('444.555.666-04', '78.901.234/0001-05', NOW()),
('555.666.777-05', '12.345.678/0001-01', NOW());

-- Postagens (5 postagens por empresas diferentes)
INSERT INTO POSTAGENS (cnpjJuridico, conteudo, imagemURL, tipo, criado_em) VALUES
('12.345.678/0001-01', 'Estamos doando paletes usados!', 'paletes.jpg', 'doacao', NOW()),
('98.765.432/0001-02', 'Oferta de papel reciclado A4 em lote.', 'papel.jpg', 'oferta', NOW()),
('45.678.901/0001-03', 'Procuramos compradores para sucata de cobre.', 'cobre.jpg', 'demanda', NOW()),
('65.432.198/0001-04', 'Temos oferta de aço reciclado.', 'aco.jpg', 'oferta', NOW()),
('78.901.234/0001-05', 'Precisamos de plástico PET prensado.', 'pet.jpg', 'demanda', NOW());

-- Curtidas em postagens
INSERT INTO CURTE (idUsuario, idPost, curtido_em) VALUES
(1, 1, NOW()),
(2, 2, NOW()),
(3, 3, NOW()),
(4, 4, NOW()),
(5, 5, NOW());

-- Salva postagens
INSERT INTO SALVA (idUsuario, idPost, salvo_em) VALUES
(1, 2, NOW()),
(2, 3, NOW()),
(3, 4, NOW()),
(4, 5, NOW()),
(5, 1, NOW());

-- Compartilhamentos
INSERT INTO COMPARTILHA (idUsuario, idPost, redeDestino, compartilhado_em) VALUES
(1, 1, 'LinkedIn', NOW()),
(2, 2, 'WhatsApp', NOW()),
(3, 3, 'Facebook', NOW()),
(4, 4, 'Instagram', NOW()),
(5, 5, 'Telegram', NOW());

-- Tags
INSERT INTO TAGS (nomeTag, corFundo) VALUES
('Reciclagem', '#00FF00'),
('Oferta', '#0000FF'),
('Demanda', '#FF0000'),
('Metal', '#AAAAAA'),
('Papel', '#FFFF00');

-- Postagem-Tag
INSERT INTO POSTAGEM_TAG (idPost, idTag) VALUES
(1, 1), (1, 2),
(2, 1), (2, 2),
(3, 1), (3, 3),
(4, 1), (4, 2),
(5, 1), (5, 3);

-- Solicitações de vínculo
INSERT INTO SOLICITACAO_VINCULO (cpfFisico, cnpjJuridico, cargoProposto, mensagem, status) VALUES
('111.222.333-01', '45.678.901/0001-03', 'Consultor', 'Gostaria de colaborar com vocês.', 'pendente'),
('222.333.444-02', '65.432.198/0001-04', 'Técnica', 'Tenho experiência na área.', 'aceito'),
('333.444.555-03', '78.901.234/0001-05', 'Supervisor', 'Podemos marcar uma reunião?', 'recusado'),
('444.555.666-04', '12.345.678/0001-01', 'Analista', 'Gostaria de entrar para o time.', 'pendente'),
('555.666.777-05', '98.765.432/0001-02', 'Engenheiro', 'Tenho interesse.', 'aceito');

-- Notificações
INSERT INTO NOTIFICACAO_FISICO (cpfFisico, tipo, idReferencia, mensagem) VALUES
('111.222.333-01', 'solicitacao_vinculo', 1, 'Sua solicitação está pendente.'),
('222.333.444-02', 'solicitacao_vinculo', 2, 'Sua solicitação foi aceita.'),
('333.444.555-03', 'solicitacao_vinculo', 3, 'Sua solicitação foi recusada.'),
('444.555.666-04', 'informacao', NULL, 'Nova postagem disponível.'),
('555.666.777-05', 'alerta', NULL, 'Atualização de política de privacidade.');

-- Mensagens entre usuários
INSERT INTO MENSAGEM (idRemetente, idDestinatario, conteudo) VALUES
(1, 2, 'Oi Maria, tudo bem?'),
(2, 3, 'Carlos, viu a nova postagem?'),
(3, 4, 'Ana, vamos conversar sobre o projeto.'),
(4, 5, 'Lucas, temos novidades!'),
(5, 1, 'João, recebi sua mensagem.');

-- Contratos entre empresas
INSERT INTO CONTRATO (cnpjFornecedor, cnpjReceptor, tituloContrato, descricao, arquivoURL) VALUES
('12.345.678/0001-01', '98.765.432/0001-02', 'Parceria Plástico-Papel', 'Contrato de fornecimento de plástico reciclado para empresa de papel.', 'contrato1.pdf'),
('45.678.901/0001-03', '65.432.198/0001-04', 'Sucata para Aço', 'Venda de sucata metálica.', 'contrato2.pdf'),
('78.901.234/0001-05', '12.345.678/0001-01', 'PET para Reciclagem', 'Contrato de cooperação para reciclagem de PET.', 'contrato3.pdf'),
('98.765.432/0001-02', '45.678.901/0001-03', 'Parceria Logística', 'Acordo de apoio logístico.', 'contrato4.pdf'),
('65.432.198/0001-04', '78.901.234/0001-05', 'Aço e Plástico', 'Integração na cadeia de reciclagem.', 'contrato5.pdf');

-- Áreas de atuações
INSERT INTO AREA_ATUACAO (nomeAreaAtuacao) VALUES
('Alimentícia'),
('Indústria de bebidas'),
('Setor de papel'),
('Sustentabilidade'),

-- Confirma inserções
COMMIT;
