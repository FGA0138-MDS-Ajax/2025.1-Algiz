'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const defaultProfileURL = 'https://res.cloudinary.com/dupalmuyo/image/upload/v1751246125/foto-perfil-padrao-usuario-2_f0ghzz.png';
    const defaultBannerURL = 'https://res.cloudinary.com/dupalmuyo/image/upload/v1751246166/banner-padrao-1_lbhrjv.png';
    await queryInterface.bulkInsert('USUARIO', [
      {
        emailUsuario: 'joao.silva@gmail.com',
        senha: 'ecoNet123',
        fotoPerfil: defaultProfileURL,
        bannerPerfil: defaultBannerURL
      },
      {
        emailUsuario: 'maria.souza@gmail.com',
        senha: 'ecoNet123',
        fotoPerfil: defaultProfileURL,
        bannerPerfil: defaultBannerURL
      },
      {
        emailUsuario: 'carlos.pereira@gmail.com',
        senha: 'ecoNet123',
        fotoPerfil: defaultProfileURL,
        bannerPerfil: defaultBannerURL
      },
      {
        emailUsuario: 'ana.oliveira@gmail.com',
        senha: 'ecoNet123',
        fotoPerfil: defaultProfileURL,
        bannerPerfil: defaultBannerURL
      },
      {
        emailUsuario: 'lucas.santos@gmail.com',
        senha: 'ecoNet123',
        fotoPerfil: defaultProfileURL,
        bannerPerfil: defaultBannerURL
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('USUARIO', null, {});
  }
};