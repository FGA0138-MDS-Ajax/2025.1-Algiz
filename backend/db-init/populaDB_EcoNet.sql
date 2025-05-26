USE EcoNet_DB;

-- Inserir usuários genéricos
INSERT INTO USUARIO (emailUsuario, senha, telefoneUsuario, estado)
VALUES 
('maria@example.com', 'maria123',11987654321, 'SP'),
('joao@example.com', 'joao123',21912345678, 'RJ');

-- Físico: Maria
INSERT INTO FISICO (cpfFisico, nomeFisico, sobrenomeFisico, sexo, dtNascimento, idUsuario)
VALUES (12345678901, 'Maria', 'Silva', 'Feminino', '1990-05-10', 1);

-- Jurídico: João LTDA
INSERT INTO JURIDICO (cnpjJuridico, razaoSocial, nomeComercial, areaAtuacao, idUsuario)
VALUES ('12345678000199', 'João Importações LTDA', 'JoaoTech', 'Tecnologia', 2);
