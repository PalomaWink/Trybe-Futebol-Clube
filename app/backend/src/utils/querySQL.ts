const inProgressQuery = `SELECT
M.id,
M.home_team_id as homeTeamId,
M.home_team_goals as homeTeamGoals,
M.away_team_id as awayTeamId,
M.away_team_goals as awayTeamGoals,
M.in_progress as inProgress,
JSON_OBJECT('teamName', HT.team_name) as homeTeam,
JSON_OBJECT('teamName', AT.team_name) as awayTeam
FROM
matches M
INNER JOIN
teams HT ON M.home_team_id = HT.id
INNER JOIN
teams AT ON M.away_team_id = AT.id
WHERE M.in_progress =`;

export default inProgressQuery;
