'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('USUARIO', [
      {
        emailUsuario: 'joao.silva@gmail.com',
        senha: 'ecoNet123',
        fotoPerfil: 'joao.jpg',
        bannerPerfil: 'banner_joao.jpg'
      },
      {
        emailUsuario: 'maria.souza@gmail.com',
        senha: 'ecoNet123',
        fotoPerfil: 'maria.jpg',
        bannerPerfil: 'banner_maria.jpg'
      },
      {
        emailUsuario: 'carlos.pereira@gmail.com',
        senha: 'ecoNet123',
        fotoPerfil: 'carlos.jpg',
        bannerPerfil: 'banner_carlos.jpg'
      },
      {
        emailUsuario: 'ana.oliveira@gmail.com',
        senha: 'ecoNet123',
        fotoPerfil: 'ana.jpg',
        bannerPerfil: 'banner_ana.jpg'
      },
      {
        emailUsuario: 'lucas.santos@gmail.com',
        senha: 'ecoNet123',
        fotoPerfil: 'lucas.jpg',
        bannerPerfil: 'banner_lucas.jpg'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('USUARIO', null, {});
  }
};