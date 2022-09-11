const e = require('express');

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
    const params = request.body;
    const name = params.name;
    const month = parseInt(params.month);
    const day = parseInt(params.day);
    const group = parseInt(params.group);
    console.log(params);
    pool.query('INSERT INTO teams (name, month, day, "group") VALUES ($1, $2, $3, $4) RETURNING *', [name, month, day, group], (error, results) => {
        if (error) {
            handleError(error, response)
        } else {
            response.status(200).send(`Added to teams: ${name} ${day}/${month} ${group}`)
        }
    })
}

const updateTeam = (request, response) => {
    const params = request.body;
    const name = params.name;
    const scoreIncrement = parseInt(params.scoreIncrement);
    console.log(name);
    pool.query('UPDATE teams SET score = score + ($2) WHERE name = ($1) RETURNING *', [name, scoreIncrement], (error, results) => {
        if (error) {
            handleError(error, response)  
        } else {
            response.status(200).send(`Incremented ${name}'s score by ${scoreIncrement}`)
        }
    })
}

const getTeams = (request, response) => {
    pool.query('SELECT * FROM teams', (error, results) => {
        if (error) {
            handleError(error, response)  
        } else {
            response.status(200).json(results.rows)
        }
    })
}

const createMatch = (request, response) => {
    const params = request.body;
    const team1 = params.team1;
    const team2 = params.team2;
    const score1 = parseInt(params.score1);
    const score2 = parseInt(params.score2);
    pool.query('INSERT INTO matches (team1, team2, score1, score2) VALUES ($1, $2, $3, $4) RETURNING *', [team1, team2, score1, score2], (error, results) => {
        if (error) {
            handleError(error, response)
        } else {
            response.status(200).send(`Added to matches: ${team1} ${team2} ${score1} ${score2}`)
        }
    })
}

const getMatches = (request, response) => {
    pool.query('SELECT * FROM matches', (error, results) => {
        if (error) {
            handleError(error, response)  
        } else {
            response.status(200).json(results.rows)
        }
    })
}

const deleteAll = (request, response) => {
    pool.query('CALL delete_all()', (error, results) => {
        if (error) {
            handleError(error, response)
        } else {
            response.status(200).send(`Deleted all records`)
        }
    })
}

const handleError = (error, response) => {
    console.log(error);
    response.status(400).send(error);
    // throw error;
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