require('dotenv').config();
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.db_port,
})

const createTeam = (request, response) => {
    const name = request.params.name;
    const month = parseInt(request.params.month);
    const day = parseInt(request.params.day);
    const group = parseInt(request.params.group);
    pool.query('INSERT INTO teams (name, month, day, group) VALUES ($1, $2, $3, $4) RETURNING *', [name, month, day, group], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Added to teams: ${name} ${day}/${month} ${group}`)
    })
}

const updateTeam = (request, response) => {
    const name = request.params.name;
    const scoreIncrement = parseInt(request.params.scoreIncrement);
    pool.query('UPDATE teams SET score = score + ($2) WHERE name = ($1) RETURNING *', [name, scoreIncrement], (error, results) => {
        if (error) {
            throw error  
        }
        response.status(200).send(`Incremented ${name}'s score by ${scoreIncrement}}`)
    })
}

const getTeams = (request, response) => {
    pool.query('SELECT * FROM teams', (error, results) => {
        if (error) {
            throw error  
        }
        response.status(200).json(results.rows)
    })
}

const createMatch = (request, response) => {
    const team1 = request.params.team1;
    const team2 = request.params.team2;
    const score1 = parseInt(request.params.score1);
    const score2 = parseInt(request.params.score2);
    pool.query('INSERT INTO matches (team1, team2, score1, score2) VALUES ($1, $2, $3, $4) RETURNING *', [team1, team2, score1, score2], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Added to matches: ${team1} ${team2} ${score1} ${score2}`)
    })
}

const getMatches = (request, response) => {
    pool.query('SELECT * FROM matches', (error, results) => {
        if (error) {
            throw error  
        }
        response.status(200).json(results.rows)
    })
}

const deleteAll = (request, response) => {
    pool.query('CALL delete_all()', (error, results) => {
        if (error) {
            throw error  
        }
        response.status(200).send(`Deleted all records`)
    })
}

const handleError = (error) => {
    console.log(error);
}

module.exports = {
    createTeam,
    updateTeam,
    createMatch,
    getTeams,
    getMatches,
    handleError,
    deleteAll
}