'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MENSAGEM', {
      idMensagem: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      idRemetente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'USUARIO',
          key: 'idUsuario'
        }
      },
      idDestinatario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'USUARIO',
          key: 'idUsuario'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      conteudo: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      enviada_em: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      visualizada: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MENSAGEM');
  }
};
