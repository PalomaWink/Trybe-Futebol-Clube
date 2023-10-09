export interface IMatches {
  id: number,
  homeTeamId: string,
  homeTeamGoals: string,
  awayTeamId: string,
  awayTeamGoals: string,
  inProgress: boolean,
}

export interface IMatchesResults {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: {
    teamName: string;
  };
  awayTeam: {
    teamName: string;
  }
}
