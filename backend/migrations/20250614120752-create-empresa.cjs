'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JURIDICO', {
      cnpjJuridico: {
        type: Sequelize.STRING(18),
        primaryKey: true
      },
      razaoSocial: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nomeComercial: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      areaAtuacao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      telefoneJuridico: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      estadoJuridico: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      enderecoJuridico: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('JURIDICO');
  }
};
