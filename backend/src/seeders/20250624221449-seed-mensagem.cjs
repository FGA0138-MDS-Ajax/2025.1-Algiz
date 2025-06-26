'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('MENSAGEM', [
      {
        idRemetente: 1,
        idDestinatario: 2,
        conteudo: 'Olá, tudo bem?',
        enviada_em: new Date(),
        visualizada: false
      },
      {
        idRemetente: 2,
        idDestinatario: 1,
        conteudo: 'Oi! Como vai?',
        enviada_em: new Date(),
        visualizada: false
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MENSAGEM', null, {});
  }
};