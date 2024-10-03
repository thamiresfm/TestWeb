
# Projeto de Testes Automatizados com Cypress

Este projeto contém testes automatizados de software utilizando o Cypress, uma ferramenta popular de testes end-to-end para aplicações web.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em seu sistema:

- [Node.js](https://nodejs.org/) (versão 12 ou superior)

## Instalação

Siga os passos abaixo para instalar o projeto e suas dependências.

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-repositorio/projeto-teste-cypress.git
   ```

2. **Navegue até o diretório do projeto**:
   ```bash
   cd projeto-teste-cypress
   ```

3. **Instale as dependências**:
   Use o comando abaixo para instalar todas as dependências necessárias, listadas no arquivo `package.json`:
   ```bash
   npm install
   ```

## Estrutura de Diretórios

A estrutura principal de pastas do projeto é a seguinte:

```bash

├── cypress/
│   ├── config/
│   │   └── env.json
│   ├── e2e/
│   │   ├── features/
│   │   │   ├── login.feature
│   │   │   ├── product.feature
│   │   │   ├── productDetails.feature
│   │   │   └── shoppingCart.feature
│   │   ├── step_definitions/
│   │   │   ├── loginSteps.js
│   │   │   ├── productSteps.js
│   │   │   ├── productDetailsSteps.js
│   │   │   └── shoppingCartStep.js
│   ├── fixtures/
│   │   ├── loginData.json
│   │   ├── productData.json
│   │   └── shoppingCartData.json
│   ├── support/
│   │   └── commands/
│   │       ├── loginCommands.js
│   │       ├── productCommands.js
│   │       ├── productDetailsCommands.js
│   │       └── shoppingCartCommands.js
│   ├── commands.js
│   └── e2e.js
├── .gitignore
├── cypress.config.js
└── package.json
```

## Como Executar os Testes

Você pode executar os testes utilizando a interface gráfica do Cypress ou diretamente no terminal:

1. **Executar com a interface gráfica**:
   ```bash
   npx cypress open
   ```

   Isso abrirá a interface gráfica do Cypress, onde você poderá selecionar e rodar os testes.

2. **Executar os testes no terminal (modo headless)**:
   Para rodar os testes diretamente no terminal, sem abrir a interface gráfica:
   ```bash
   npx cypress run
   ```

## Configurações

Todas as configurações de execução dos testes estão definidas no arquivo `cypress.config.js`. Caso precise alterar o diretório dos testes, timeout ou outras configurações específicas, ajuste este arquivo conforme necessário.

## Dependências

As principais dependências do projeto estão listadas no `package.json`. Algumas das dependências importantes incluem:

- `cypress`: Ferramenta de testes automatizados end-to-end.

