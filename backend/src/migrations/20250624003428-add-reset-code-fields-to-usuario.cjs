'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('USUARIO');
    
    if (!table.reset_code) {
      await queryInterface.addColumn('USUARIO', 'reset_code', {
        type: Sequelize.STRING,
        allowNull: true
      });
    }

    if (!table.reset_code_expires_at) {
      await queryInterface.addColumn('USUARIO', 'reset_code_expires_at', {
        type: Sequelize.DATE,
        allowNull: true
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('USUARIO', 'reset_code');
    await queryInterface.removeColumn('USUARIO', 'reset_code_expires_at');
  }
};
