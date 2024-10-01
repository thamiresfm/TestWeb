const cucumber = require('cypress-cucumber-preprocessor').default;
const { defineConfig } = require("cypress");
const fs = require('fs'); // Adiciona o módulo 'fs' para ler o arquivo JSON

// Função para carregar as configurações do arquivo env.json
function loadEnvConfig() {
  const configPath = './cypress/config/env.json';
  return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Carrega as variáveis de ambiente do arquivo env.json
      const envConfig = loadEnvConfig();

      // Atribui valores diretamente do envConfig ao config
      config.baseUrl = envConfig.baseUrl;
      config.env.username = envConfig.username;
      config.env.password = envConfig.password;
      config.defaultCommandTimeout = envConfig.defaultCommandTimeout;
      config.pageLoadTimeout = envConfig.pageLoadTimeout;

      // Configuração do preprocessor para cucumber
      on('file:preprocessor', cucumber());

      return config; // Retorna a configuração modificada
    },
    specPattern: "cypress/e2e/features/*.feature",
    chromeWebSecurity: false,
    retries: {
      runMode: 2,
      openMode: 0
    },
    viewportWidth: 1280,
    viewportHeight: 720,
  }
});
