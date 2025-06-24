// jest.config.js
// Como o projeto está configurado com "type": "module", usamos a sintaxe 'export default'
export default {
  // O Jest irá parar no primeiro teste que falhar. Comente se preferir que ele rode todos.
  // bail: true, 
  
  // Limpa mocks entre cada teste para evitar interferências.
  clearMocks: true,

  // Diretório onde os relatórios de cobertura serão salvos.
  coverageDirectory: "coverage",

  // O ambiente de teste que será usado. 'node' é o padrão para backend.
  testEnvironment: "node",
};
