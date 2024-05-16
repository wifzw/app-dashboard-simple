# Project Dashboard Simple

## Pré-requisitos

Antes de começar, certifique-se de ter instalado os seguintes programas:

- Docker Desktop
- Editor de código: VSCode (recomendado)
- Node.js >= 20.0
- Postbird

## Configuração do Ambiente

1. **Clonar o repositório da API**

   Clone o repositório do projeto para a sua máquina local.

2. **Iniciar o Banco de Dados com Docker**

   - Navegue até a pasta `DB` do projeto.
   - Execute o comando `docker-compose up -d`. Isso iniciará os serviços de banco de dados definidos no arquivo `docker-compose.yml`.
   - Aguarde o processo concluir e, em seguida, volte para a pasta principal do projeto.

3. **Iniciar o Banco de Dados criado pelo Docker Desktop**

   - Inicie o banco de dados que foi criado e configurado pelo Docker Desktop.

4. **Instalar as Dependências**

   - Navegue até a pasta `authentication` do projeto.
   - Execute o comando `yarn install` ou `npm install` para instalar todas as dependências necessárias para o projeto.

5. **Iniciar a API**

   - Para iniciar a API em modo de desenvolvimento, execute o comando `yarn server:start` ou `npm run server:start`.

## Créditos

Este projeto foi desenvolvido por Kauan Motta. Para mais informações, visite o perfil do LinkedIn: [https://www.linkedin.com/in/kauan-motta/].
