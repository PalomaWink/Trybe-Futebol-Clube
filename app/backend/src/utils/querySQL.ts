const inProgressTrue = `SELECT
matches.id,
home_team_id as homeTeam,
away_team_id as awayTeam,
FROM
matches
LEFT JOIN
teams AS homeTeams ON matches.home_team_id = homeTeams.id
LEFT JOIN
teams AS awayTeams ON matches.away_team_id = awayTeams.id`;

export default {
  inProgressTrue,
};
