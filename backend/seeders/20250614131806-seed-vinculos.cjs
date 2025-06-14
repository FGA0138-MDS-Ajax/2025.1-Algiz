'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('VINCULO_JURIDICO_FISICO', [
      {
        cpfFisico: '111.222.333-01',
        cnpjJuridico: '12.345.678/0001-01',
        cargo: 'Analista Ambiental'
      },
      {
        cpfFisico: '222.333.444-02',
        cnpjJuridico: '98.765.432/0001-02',
        cargo: 'Engenheira de Processos'
      },
      {
        cpfFisico: '333.444.555-03',
        cnpjJuridico: '45.678.901/0001-03',
        cargo: 'Gerente de Operações'
      },
      {
        cpfFisico: '444.555.666-04',
        cnpjJuridico: '65.432.198/0001-04',
        cargo: 'Assistente Técnica'
      },
      {
        cpfFisico: '555.666.777-05',
        cnpjJuridico: '78.901.234/0001-05',
        cargo: 'Supervisor de Logística'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('VINCULO_JURIDICO_FISICO', null, {});
  }
};