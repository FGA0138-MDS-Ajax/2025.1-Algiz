'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const defaultProfileURL = '/user/foto-perfil-padrao-2.png';
    const defaultBannerURL = '/user/banner-padrao-1.png';

    const plainUsers = [
      { emailUsuario: 'joao.silva@gmail.com', senha: '@ecoNet123' },
      { emailUsuario: 'maria.souza@gmail.com', senha: '@ecoNet123' },
      { emailUsuario: 'carlos.pereira@gmail.com', senha: '@ecoNet123' },
      { emailUsuario: 'ana.oliveira@gmail.com', senha: '@ecoNet123' },
      { emailUsuario: 'lucas.santos@gmail.com', senha: '@ecoNet123' },
    ];

    const usersHashed = await Promise.all(
      plainUsers.map(async (user) => ({
        ...user,
        senha: await bcrypt.hash(user.senha, 12),
        fotoPerfil: defaultProfileURL,
        bannerPerfil: defaultBannerURL,
      }))
    );

    await queryInterface.bulkInsert('USUARIO', usersHashed, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('USUARIO', null, {});
  }
};
