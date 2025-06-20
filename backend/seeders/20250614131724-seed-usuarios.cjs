'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('USUARIO', [
      {
        emailUsuario: 'joao.silva@gmail.com',
        senha: 'ecoNet123',
        fotoPerfil: 'default/foto-perfil-padrao-usuario-1.png',
        bannerPerfil: 'default/banner-padrao-1.png'
      },
      {
        emailUsuario: 'maria.souza@gmail.com',
        senha: 'ecoNet123',
        fotoPerfil: 'default/foto-perfil-padrao-usuario-1.png',
        bannerPerfil: 'default/banner-padrao-1.png'
      },
      {
        emailUsuario: 'carlos.pereira@gmail.com',
        senha: 'ecoNet123',
        fotoPerfil: 'default/foto-perfil-padrao-usuario-1.png',
        bannerPerfil: 'default/banner-padrao-1.png'
      },
      {
        emailUsuario: 'ana.oliveira@gmail.com',
        senha: 'ecoNet123',
        fotoPerfil: 'default/foto-perfil-padrao-usuario-1.png',
        bannerPerfil: 'default/banner-padrao-1.png'
      },
      {
        emailUsuario: 'lucas.santos@gmail.com',
        senha: 'ecoNet123',
        fotoPerfil: 'default/foto-perfil-padrao-usuario-1.png',
        bannerPerfil: 'default/banner-padrao-1.png'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('USUARIO', null, {});
  }
};