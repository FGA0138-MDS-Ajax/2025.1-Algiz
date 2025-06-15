'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VINCULO_EMPRESA_FISICO', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cpfFisico: {
        type: Sequelize.STRING(14),
        allowNull: true
      },
      cnpjJuridico: {
        type: Sequelize.STRING(18),
        allowNull: true
      },
      cargo: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('VINCULO_EMPRESA_FISICO');
  }
};
