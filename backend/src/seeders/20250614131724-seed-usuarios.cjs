'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('USUARIO', [
      {
        emailUsuario: 'joao.silva@gmail.com',
        senha: 'ecoNet123',
        fotoPerfil: 'https://res.cloudinary.com/dupalmuyo/image/upload/v1751246125/foto-perfil-padrao-usuario-2_f0ghzz.png',
        bannerPerfil: 'https://res.cloudinary.com/dupalmuyo/image/upload/v1751246166/banner-padrao-1_lbhrjv.png'
      },
      {
        emailUsuario: 'maria.souza@gmail.com',
        senha: 'ecoNet123',
        fotoPerfil: 'https://res.cloudinary.com/dupalmuyo/image/upload/v1751246125/foto-perfil-padrao-usuario-2_f0ghzz.png',
        bannerPerfil: 'https://res.cloudinary.com/dupalmuyo/image/upload/v1751246166/banner-padrao-1_lbhrjv.png'
      },
      {
        emailUsuario: 'carlos.pereira@gmail.com',
        senha: 'ecoNet123',
        fotoPerfil: 'https://res.cloudinary.com/dupalmuyo/image/upload/v1751246125/foto-perfil-padrao-usuario-2_f0ghzz.png',
        bannerPerfil: 'https://res.cloudinary.com/dupalmuyo/image/upload/v1751246166/banner-padrao-1_lbhrjv.png'
      },
      {
        emailUsuario: 'ana.oliveira@gmail.com',
        senha: 'ecoNet123',
        fotoPerfil: 'https://res.cloudinary.com/dupalmuyo/image/upload/v1751246125/foto-perfil-padrao-usuario-2_f0ghzz.png',
        bannerPerfil: 'https://res.cloudinary.com/dupalmuyo/image/upload/v1751246166/banner-padrao-1_lbhrjv.png'
      },
      {
        emailUsuario: 'lucas.santos@gmail.com',
        senha: 'ecoNet123',
        fotoPerfil: 'https://res.cloudinary.com/dupalmuyo/image/upload/v1751246125/foto-perfil-padrao-usuario-2_f0ghzz.png',
        bannerPerfil: 'https://res.cloudinary.com/dupalmuyo/image/upload/v1751246166/banner-padrao-1_lbhrjv.png'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('USUARIO', null, {});
  }
};