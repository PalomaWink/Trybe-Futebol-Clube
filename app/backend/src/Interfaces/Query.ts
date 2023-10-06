export default interface queryType {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: number;
  homeTeam: {
    teamName: string,
  };
  awayTeam: {
    teamName: string,
  };
}
