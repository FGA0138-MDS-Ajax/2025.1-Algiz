'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FISICO', {
      cpfFisico: {
        type: Sequelize.STRING(14),
        primaryKey: true
      },
      nomeFisico: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      sobrenomeFisico: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      sexo: {
        type: Sequelize.STRING(17),
        allowNull: false
      },
      dtNascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      telefoneFisico: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      estadoFisico: {
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
    await queryInterface.dropTable('FISICO');
  }
};
