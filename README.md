# Trybe Futebol Clube

Este é um projeto informativo sobre partidas e classificações de futebol! ⚽️
Este projeto enfatiza o desenvolvimento do back-end, que foi contêinerizado com Docker e modelado utilizando Sequelize para a gestão de dados. As regras de negócio, conforme especificadas no README do projeto, foram rigorosamente seguidas. Além disso, a API desenvolvida foi projetada para ser perfeitamente consumida por um front-end previamente fornecido para o projeto.

## Tecnologias Utilizadas

- **Typescript**: A linguagem de programação principal usada neste projeto.
- **Node.js**: Ambiente de execução JavaScript usado para o backend.
- **Docker**: Usado para contêinerizar o backend e o frontend.
- **Sequelize**: Usado para interagir com o banco de dados no backend.
- **ExpressJS**: Usado para criação dos endpoints.
- **MySQL**: Banco de dados usado no projeto.
- **Bcryptjs npm**: A biblioteca utilizada para criptografar as senhas no banco de dados.

## Estrutura do Projeto

O projeto é dividido em duas partes principais: `backend` e `frontend`.

### Backend

O backend é uma aplicação Node.js que usa Sequelize para interagir com o banco de dados. Ele está contido na pasta `app/backend`. O ponto de entrada para o backend é `app/backend/src/app.ts`.

### Frontend

O frontend é uma aplicação web que está contida na pasta `app/frontend`.

## Como Executar o Projeto

Este projeto usa Docker para contêinerização. Para executar o projeto, você precisa ter o Docker instalado em sua máquina.

1. Clone o repositório.
2. Navegue até a pasta do projeto.
3. Execute o comando `install:apps` para instalar as dependencias do front e do back
4. Após de `npm run compose:up` para subir os containers
5. Caso queira rodar o front, acesse a pasta dele pelo terminal e rode `npm start`

## Contribuindo

Contribuições são bem-vindas!
Este projeto é para fins educacionais, portanto, pull requests não serão aceitos.

## Licença

MIT
