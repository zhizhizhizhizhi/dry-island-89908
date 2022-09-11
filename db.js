require('dotenv').config();
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.db_port,
})

const createTeam = (name, month, day, group) => {
    var res;
    pool.query('INSERT INTO teams (name, month, day, group) VALUES ($1, $2, $3, $4) RETURNING *', [name, month, day, group], (error, results) => {
        if (error) {
            throw error
        }
        res = results
    })
    return res;
}

const updateTeam = (name, scoreIncrement) => {
    var res;
    pool.query('UPDATE teams SET score = score + ($2) WHERE name = ($1) RETURNING *', [name, scoreIncrement], (error, results) => {
        if (error) {
            throw error  
        }
        res = results
    })
    return res;
}

const createMatch = (team1, team2, score1, score2) => {
    var res;
    pool.query('INSERT INTO matches (team1, team2, score1, score2) VALUES ($1, $2, $3, $4) RETURNING *', [team1, team2, score1, score2], (error, results) => {
        if (error) {
            throw error
        }
        res = results
    })
    return res;
}

const handleError = (error) => {
    console.log(error);
}

module.exports = {
    createTeam,
    updateTeam,
    createMatch,
    handleError
}