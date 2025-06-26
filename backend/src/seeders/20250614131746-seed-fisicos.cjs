'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('FISICO', [
      {
        cpfFisico: '111.222.333-01',
        nomeFisico: 'João',
        sobrenomeFisico: 'Silva',
        telefoneFisico: '(11) 98765-4321',
        estadoFisico: 'SP',
        sexo: 'Masculino',
        dtNascimento: '1985-05-15',
        idUsuario: 2
      },
      {
        cpfFisico: '222.333.444-02',
        nomeFisico: 'Maria',
        sobrenomeFisico: 'Souza',
        telefoneFisico: '(21) 98765-4321',
        estadoFisico: 'RJ',
        sexo: 'Feminino',
        dtNascimento: '1990-08-20',
        idUsuario: 3
      },
      {
        cpfFisico: '333.444.555-03',
        nomeFisico: 'Carlos',
        sobrenomeFisico: 'Pereira',
        telefoneFisico: '(31) 98765-4321',
        estadoFisico: 'MG',
        sexo: 'Masculino',
        dtNascimento: '1978-11-03',
        idUsuario: 4
      },
      {
        cpfFisico: '444.555.666-04',
        nomeFisico: 'Ana',
        sobrenomeFisico: 'Oliveira',
        telefoneFisico: '(41) 98765-4321',
        estadoFisico: 'PR',
        sexo: 'Feminino',
        dtNascimento: '1995-02-28',
        idUsuario: 5
      },
      {
        cpfFisico: '555.666.777-05',
        nomeFisico: 'Lucas',
        sobrenomeFisico: 'Santos',
        telefoneFisico: '(51) 98765-4321',
        estadoFisico: 'RS',
        sexo: 'Masculino',
        dtNascimento: '1982-07-19',
        idUsuario: 6
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('FISICO', null, {});
  }
};
