import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Teams from '../database/models/Teams.Model';
import { allTeams, teamId } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /teams', () => {
  it('Testando se ao fazer um findAll, retorna todos os times', async function () {
    sinon.stub(Teams, 'findAll').resolves(allTeams as unknown as Teams[]);

    const {status, body} = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allTeams);
  });

  it('Testando se ao fazer a pesquisa por ID, retorna o time correto', async function () {
    sinon.stub(Teams, 'findByPk').resolves(teamId as unknown as Teams);

    const {status, body} = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamId);
  });
});
