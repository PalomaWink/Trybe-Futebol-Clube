import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Users from '../database/models/Users.Model';
import { users, usersError } from './mocks/users.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /login', () => {
  it('Testando se ao fazer um login com email e senha correto, retorna um token', async function () {
    sinon.stub(Users, 'findOne').resolves(users as unknown as Users);

    const usuario = {
      "email": "admin@admin.com",
      "password": "secret_admin"
    }

    const {status, body} = await chai.request(app).post('/login').send(usuario);

    expect(status).to.equal(200);
    expect(body).to.have.property('token');
  });

  it('Testando se ao fazer login com um email inexistente, retorna um erro', async function () {
    sinon.stub(Users, 'findOne').resolves(null);

    const usuario = {
      "email": "teste@teste.com",
      "password": "secret_admin"
    }

    const {status, body} = await chai.request(app).post('/login').send(usuario);
    

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('Testando se ao fazer login com uma senha inexistente, retorna um erro', async function () {
    sinon.stub(Users, 'findOne').resolves(users as unknown as Users);

    const usuario = {
      "email": "admin@admin.com",
      "password": "123456"
    }

    const {status, body} = await chai.request(app).post('/login').send(usuario);
    

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: "Invalid email or password" });
  });
  afterEach(function () {
    sinon.restore();
  });
});
