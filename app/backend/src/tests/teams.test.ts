import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Teams from '../database/models/Teams.Model';
import { allTeams } from './mocks/teams.mock';
import ITeam from '../Interfaces/Teams/Teams'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /teams', () => {
  it('Testando se ao fazer um findAll, retorna todos os times', async function () {
    sinon.stub(Teams, 'findAll').resolves(allTeams as any);

    const {status, body} = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allTeams);
  });
});
