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
m M
INNER JOIN
teams HT ON M.home_team_id = HT.id
INNER JOIN
teams AT ON M.away_team_id = AT.id
WHERE M.in_progress =`;

const leaderboardQuery = `SELECT
t.team_name AS name,
SUM(
    CASE
        WHEN m.home_team_id = t.id AND m.home_team_goals > m.away_team_goals THEN 3
        WHEN m.home_team_id = t.id AND m.home_team_goals = m.away_team_goals THEN 1
        WHEN m.away_team_id = t.id AND m.away_team_goals > m.home_team_goals THEN 3
        WHEN m.away_team_id = t.id AND m.away_team_goals = m.home_team_goals THEN 1
        ELSE 0
    END
) AS totalPoints,
COUNT(
    CASE
        WHEN m.home_team_id = t.id OR m.away_team_id = t.id THEN 1
    END
) AS totalGames,
COUNT(
    CASE
        WHEN m.home_team_id = t.id AND m.home_team_goals > m.away_team_goals THEN 1
        WHEN m.away_team_id = t.id AND m.away_team_goals > m.home_team_goals THEN 1
    END
) AS totalVictories,
COUNT(
    CASE
        WHEN m.home_team_id = t.id AND m.home_team_goals = m.away_team_goals THEN 1
        WHEN m.away_team_id = t.id AND m.away_team_goals = m.home_team_goals THEN 1
    END
) AS totalDraws,
COUNT(
    CASE
        WHEN m.home_team_id = t.id AND m.home_team_goals < m.away_team_goals THEN 1
        WHEN m.away_team_id = t.id AND m.away_team_goals < m.home_team_goals THEN 1
    END
) AS totalLosses,
SUM(
    CASE
        WHEN m.home_team_id = t.id THEN m.home_team_goals
        WHEN m.away_team_id = t.id THEN m.away_team_goals
    END
) AS goalsFavor,
SUM(
    CASE
        WHEN m.home_team_id = t.id THEN m.away_team_goals
        WHEN m.away_team_id = t.id THEN m.home_team_goals
    END
) AS goalsOwn,
SUM(
    CASE
        WHEN m.home_team_id = t.id THEN m.home_team_goals - m.away_team_goals
        WHEN m.away_team_id = t.id THEN m.away_team_goals - m.home_team_goals
    END
) AS goalsBalance,
ROUND((SUM(
    CASE
        WHEN m.home_team_id = t.id AND m.home_team_goals > m.away_team_goals THEN 3
        WHEN m.home_team_id = t.id AND m.home_team_goals = m.away_team_goals THEN 1
        WHEN m.away_team_id = t.id AND m.away_team_goals > m.home_team_goals THEN 3
        WHEN m.away_team_id = t.id AND m.away_team_goals = m.home_team_goals THEN 1
        ELSE 0
    END
) / (COUNT(
    CASE
        WHEN m.home_team_id = t.id OR m.away_team_id = t.id THEN 1
    END
)) * 100), 2) AS efficiency
FROM
teams AS t
INNER JOIN
matches AS m ON t.id = m.home_team_id OR t.id = m.away_team_id
GROUP BY
t.id, t.team_name
ORDER BY
totalPoints DESC, goalsBalance DESC, goalsFavor DESC`;

export { inProgressQuery, leaderboardQuery };
