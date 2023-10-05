import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Matches from '../database/models/Matches.Model';
import { allMatches } from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /matches', () => {
  it('Testando se ao fazer um findAll, retorna todas as partidas', async function () {
    sinon.stub(Matches, 'findAll').resolves(allMatches as unknown as Matches[]);

    const {status, body} = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allMatches);
  });
  afterEach(function () {
    sinon.restore();
  });
});
