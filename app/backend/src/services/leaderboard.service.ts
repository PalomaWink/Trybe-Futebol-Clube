import { ModelStatic } from 'sequelize';
import Matches from '../database/models/Matches.Model';
import TeamsService from './teams.service';
import Teams from '../database/models/Teams.Model';

export default class LeaderboardService {
  private _teams = new TeamsService();
  private _matchesResults: Matches[] = [];
  private _totalPoints = 0;
  private _totalVictories = 0;
  private _totalDraws = 0;
  private _totalLosses = 0;
  private _totalGamesHomeTeam = 0;
  private _totalGamesAwayTeam = 0;
  private _goalsFavor = 0;
  private _goalsOwn = 0;
  private _goalsBalance = 0;
  private _efficiency = 0;
  constructor(
    private _matchesModel: ModelStatic<Matches> = Matches,
  ) {
    this.getMatchResults().then((matches) => {
      this._matchesResults = matches;
    });
  }

  private async getMatchResults() {
    const allMatches = await this._matchesModel.findAll({
      where: {
        inProgress: 1,
      },
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return allMatches;
  }

  private async totalGamesAndGoals(teamId: number) {
    let totalGames = 0;
    let goalsFavor = 0;
    let goalsOwn = 0;
    this._matchesResults.forEach((match) => {
      if (match.homeTeamId === teamId) {
        totalGames += 1;
        goalsFavor += match.homeTeamGoals;
      }
      if (match.awayTeamId === teamId) {
        totalGames += 1;
        goalsOwn += match.awayTeamGoals;
      }
    });
    return { totalGames, goalsFavor, goalsOwn };
  }

  private async totalPointsAndVictories(teamId: number) {
    let totalPoints = 0;
    let totalVictories = 0;
    let totalDraws = 0;
    this._matchesResults.forEach((match) => {
      if (match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals) {
        totalPoints += 3;
        totalVictories += 1;
      } else if (match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals) {
        totalVictories += 1;
        totalPoints += 3;
      } else {
        totalPoints += 1;
        totalDraws += 1;
      }
    });
    return { totalPoints, totalVictories, totalDraws };
  }

  private async totalLosses(teamId: number) {
    let totalLoses = 0;
    this._matchesResults.forEach((match) => {
      if ((match.homeTeamId === teamId && match.homeTeamGoals < match.awayTeamGoals)
      || (match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals)) {
        totalLoses += 1;
      }
    });
    return totalLoses;
  }

  private async totalGoalsBalance(teamId: number) {
    this._matchesResults.forEach((match) => {
      if (match.homeTeamId === teamId) {
        this._goalsBalance = match.homeTeamGoals - match.awayTeamGoals;
      }
      if (match.awayTeamId === teamId) {
        this._goalsBalance = match.awayTeamGoals - match.homeTeamGoals;
      }
    });
  }

  private async totalEfficiency(teamId: number) {
    this._matchesResults.forEach((match) => {
      if (match.homeTeamId === teamId) {
        const efficiency = (this._totalPoints / this._totalGamesHomeTeam) * 100;
        this._efficiency = Number(efficiency.toFixed(2));
      }
      if (match.awayTeamId === teamId) {
        const efficiency = (this._totalPoints / this._totalGamesAwayTeam) * 100;
        this._efficiency = Number(efficiency.toFixed(2));
      }
    });
  }

  private async filterHomeTeams() {
    const { data } = await this._teams.getAllTeams();
    const allMatches = this._matchesResults;
    const homeTeams = data.filter((team) => allMatches
      .filter((match) => team.id === match.homeTeamId || team.id === match.awayTeamId));
    return homeTeams;
  }

  public async getLeaderboard() {
    const homeTeams = await this.filterHomeTeams();
    const leaderboard = homeTeams.map((teamData) => ({
      name: teamData.teamName,
      totalPoints: this.totalPointsAndVictories(teamData.id),
      totalGames: this.totalGamesAndGoals(teamData.id),
      totalDraws: this._totalDraws,
      totalLosses: this.totalLosses(teamData.id),
      goalsBalance: this.totalGoalsBalance(teamData.id),
      efficiency: this.totalEfficiency(teamData.id),
    }));
    return { status: 200, data: leaderboard };
  }
}
