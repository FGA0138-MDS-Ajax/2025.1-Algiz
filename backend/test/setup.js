import { sequelize } from '../src/models/index.model.js';

beforeAll(async () => {
  try {
    await sequelize.authenticate();
    console.log('>>> Conexão de teste com o banco estabelecida com sucesso.');
  } catch (error) {
    console.error('XXX Não foi possível conectar ao banco de dados de teste:', error);
    process.exit(1); // Aborta os testes se não conseguir conectar
  }
});

afterAll(async () => {
  await sequelize.close();
  console.log('>>> Conexão de teste com o banco encerrada.');
});