const allMatches = [
	{
		"id": 1,
		"homeTeamId": 16,
		"homeTeamGoals": 1,
		"awayTeamId": 8,
		"awayTeamGoals": 1,
		"inProgress": true,
		"homeTeam": {
			"teamName": "São Paulo"
		},
		"awayTeam": {
			"teamName": "Grêmio"
		}
	},
	{
		"id": 2,
		"homeTeamId": 9,
		"homeTeamGoals": 1,
		"awayTeamId": 14,
		"awayTeamGoals": 1,
		"inProgress": false,
		"homeTeam": {
			"teamName": "Internacional"
		},
		"awayTeam": {
			"teamName": "Santos"
		}
	},
	{
		"id": 3,
		"homeTeamId": 4,
		"homeTeamGoals": 3,
		"awayTeamId": 11,
		"awayTeamGoals": 0,
		"inProgress": false,
		"homeTeam": {
			"teamName": "Corinthians"
		},
		"awayTeam": {
			"teamName": "Napoli-SC"
		}
	},
	{
		"id": 4,
		"homeTeamId": 3,
		"homeTeamGoals": 0,
		"awayTeamId": 2,
		"awayTeamGoals": 0,
		"inProgress": false,
		"homeTeam": {
			"teamName": "Botafogo"
		},
		"awayTeam": {
			"teamName": "Bahia"
		}
	}
]

const matchInProgress = [{
	"id": 1,
	"homeTeamId": 16,
	"homeTeamGoals": 1,
	"awayTeamId": 8,
	"awayTeamGoals": 1,
	"inProgress": true,
	"homeTeam": {
		"teamName": "São Paulo"
	},
	"awayTeam": {
		"teamName": "Grêmio"
	}
}]

const finishedMatch = [
	{
		"id": 2,
		"homeTeamId": 9,
		"homeTeamGoals": 1,
		"awayTeamId": 14,
		"awayTeamGoals": 1,
		"inProgress": false,
		"homeTeam": {
			"teamName": "Internacional"
		},
		"awayTeam": {
			"teamName": "Santos"
		}
	},
	{
		"id": 3,
		"homeTeamId": 4,
		"homeTeamGoals": 3,
		"awayTeamId": 11,
		"awayTeamGoals": 0,
		"inProgress": false,
		"homeTeam": {
			"teamName": "Corinthians"
		},
		"awayTeam": {
			"teamName": "Napoli-SC"
		}
	},
	{
		"id": 4,
		"homeTeamId": 3,
		"homeTeamGoals": 0,
		"awayTeamId": 2,
		"awayTeamGoals": 0,
		"inProgress": false,
		"homeTeam": {
			"teamName": "Botafogo"
		},
		"awayTeam": {
			"teamName": "Bahia"
		}
	}
]

const createNewMatch = {
  "homeTeamId": 16,
  "awayTeamId": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}

const newMatchCreated = {
  "id": 49,
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 8,
  "awayTeamGoals": 2,
  "inProgress": true
}

const createdWrongMatch = {
	"homeTeamId": 16,
	"awayTeamId": 16,
	"homeTeamGoals": 2,
	"awayTeamGoals": 2
  }

export {
	allMatches,
	finishedMatch,
	matchInProgress,
  createNewMatch,
  newMatchCreated,
  createdWrongMatch
};