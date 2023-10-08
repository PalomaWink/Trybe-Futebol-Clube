import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Matches from '../database/models/Matches.Model';
import MatchesService from '../services/matches.service';
import Validations from '../middleware/Validations';
import { allMatches, finishedMatch, matchInProgress, createNewMatch, newMatchCreated, createdWrongMatch } from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /matches', () => {
  it('Testando se ao fazer um findAll, retorna todas as partidas', async function () {
    sinon.stub(Matches, 'findAll').resolves(allMatches as unknown as Matches[]);

    const {status, body} = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allMatches);
  });
  it('Testando se e possivel pegar uma partida em andamento', async function () {
    sinon.stub(Matches, 'findAll').resolves(allMatches as unknown as Matches[]);
    sinon.stub(MatchesService.prototype, 'getAllMatches').resolves({status: 200, data: matchInProgress});
    const {status, body} = await chai
      .request(app).get('/matches?inProgress=true')
    
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchInProgress);
  });

  it('Testando se e possivel pegar uma partida ja finalizada', async function () {
    sinon.stub(Matches, 'findAll').resolves(allMatches as unknown as Matches[]);
    sinon.stub(MatchesService.prototype, 'getAllMatches').resolves({status: 200, data: finishedMatch});
    
    const {status, body} = await chai
      .request(app).get('/matches?inProgress=false')
    
    expect(status).to.equal(200);
    expect(body).to.deep.equal(finishedMatch);
  });

  it('Testando se retorna erro ao enviar um token inválido', async function () {
    sinon.stub(Matches, 'create').resolves(newMatchCreated as unknown as Matches);
    sinon.stub(Validations, 'validateRegister').resolves();
    const secret = process.env.JWT_SECRET || 'padrao';
    const token = jwt.sign({ id: 1 }, secret as string, { expiresIn: '1h' });
    const { status, body } = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', `${token}`)
      .send(createNewMatch);
      
    expect(status).to.equal(401);
    expect(body).to.deep.equal({message: 'Token must be a valid token' });
  });

  it('Testando se e possivel cadastrar uma partida', async function () {
    sinon.stub(Matches, 'create').resolves(newMatchCreated as unknown as Matches);
    sinon.stub(Validations, 'validateRegister').resolves();
    const secret = process.env.JWT_SECRET || 'padrao';
    const token = jwt.sign({ id: 1 }, secret as string, { expiresIn: '1h' });
    const { status, body } = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', `Bearer ${token}`)
      .send(createNewMatch);
      
    expect(status).to.equal(201);
    expect(body).to.deep.equal(newMatchCreated);
  });

  it('Testando se retorna um erro ao tentar cadastrar uma partida com 2 times iguais', async function () {
    sinon.stub(Matches, 'create').resolves(createdWrongMatch as unknown as Matches);
    sinon.stub(Validations, 'validateRegister').resolves();
    const secret = process.env.JWT_SECRET || 'padrao';
    const token = jwt.sign({ id: 1 }, secret as string, { expiresIn: '1h' });
    const { status, body } = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', `Bearer ${token}`)
      .send(createdWrongMatch);
      
    expect(status).to.equal(422);
    expect(body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
  });
  afterEach(function () {
    sinon.restore();
  });
});
