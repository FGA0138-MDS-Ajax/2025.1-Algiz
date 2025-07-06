'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('VINCULO_JURIDICO_FISICO', [
      {
        cpfFisico: '111.222.333-01',
        cnpjJuridico: '12345678000101',
        cargo: 'Analista Ambiental'
      },
      {
        cpfFisico: '222.333.444-02',
        cnpjJuridico: '98765432000102',
        cargo: 'Engenheira de Processos'
      },
      {
        cpfFisico: '333.444.555-03',
        cnpjJuridico: '45678901000103',
        cargo: 'Gerente de Operações'
      },
      {
        cpfFisico: '444.555.666-04',
        cnpjJuridico: '65432198000104',
        cargo: 'Assistente Técnica'
      },
      {
        cpfFisico: '555.666.777-05',
        cnpjJuridico: '78901234000105',
        cargo: 'Supervisor de Logística'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('VINCULO_JURIDICO_FISICO', null, {});
  }
};