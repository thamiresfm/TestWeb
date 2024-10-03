const cucumber = require('cypress-cucumber-preprocessor').default;
const { defineConfig } = require("cypress");
const fs = require('fs'); 


function loadEnvConfig() {
  const configPath = './cypress/config/env.json';
  return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const envConfig = loadEnvConfig();

      config.baseUrl = envConfig.baseUrl;
      config.env.username = envConfig.username;
      config.env.password = envConfig.password;
      config.defaultCommandTimeout = envConfig.defaultCommandTimeout;
      config.pageLoadTimeout = envConfig.pageLoadTimeout;

      on('file:preprocessor', cucumber());

      return config;
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
