'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('JURIDICO', [
      {
        cnpjJuridico: '12.345.678/0001-01',
        razaoSocial: 'RECICLATECH SOLUCOES AMBIENTAIS LTDA',
        nomeComercial: 'ReciclaTech',
        telefoneJuridico: '(11) 98765-0001',
        estadoJuridico: 'SP',
        enderecoJuridico: 'Rua da Reciclagem, 123',
        areaAtuacao: 'Reciclagem de plástico',
        idUsuario: 2
      },
      {
        cnpjJuridico: '98.765.432/0001-02',
        razaoSocial: 'ECOPAPER INDUSTRIA DE PAPEL SA',
        nomeComercial: 'EcoPaper',
        telefoneJuridico: '(21) 98765-0002',
        estadoJuridico: 'RJ',
        enderecoJuridico: 'Avenida do Papel, 456',
        areaAtuacao: 'Reciclagem de papel',
        idUsuario: 3
      },
      {
        cnpjJuridico: '45.678.901/0001-03',
        razaoSocial: 'SUCATA CENTER COMERCIO DE MATERIAIS LTDA',
        nomeComercial: 'SucataCenter',
        telefoneJuridico: '(31) 98765-0003',
        estadoJuridico: 'MG',
        enderecoJuridico: 'Praça da Sucata, 789',
        areaAtuacao: 'Compra/venda de metais',
        idUsuario: 4
      },
      {
        cnpjJuridico: '65.432.198/0001-04',
        razaoSocial: 'VERDE METAL RECICLADORA EIRELI',
        nomeComercial: 'VerdeMetal',
        telefoneJuridico: '(41) 98765-0004',
        estadoJuridico: 'PR',
        enderecoJuridico: 'Rua do Metal, 101',
        areaAtuacao: 'Reciclagem de metais',
        idUsuario: 5
      },
      {
        cnpjJuridico: '78.901.234/0001-05',
        razaoSocial: 'PLASTINOVOS INDUSTRIA E COMERCIO LTDA',
        nomeComercial: 'PlastiNovos',
        telefoneJuridico: '(51) 98765-0005',
        estadoJuridico: 'RS',
        enderecoJuridico: 'Avenida dos Plásticos, 202',
        areaAtuacao: 'Transformação de plásticos',
        idUsuario: 6
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('JURIDICO', null, {});
  }
};
