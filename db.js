const { response } = require('express');
const e = require('express');
const parser = require('./parser');

require('dotenv').config();
const Pool = require('pg').Pool;
const isProduction = process.env.NODE_ENV === "production";

const pool = isProduction ?
    new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    })
    : 
    new Pool({
        user: process.env.user,
        host: process.env.host,
        database: process.env.database,
        password: process.env.password,
        port: process.env.db_port,
    })

const createTeams = (request, response) => {
    let values = [];
    try {
        values = parser.parseTeams(request.body); 
    } catch (error) {
        response.status(400).send({message: "cannot parse ", cause: error.cause});
        return;
    }  
    if (values.length == 0) {
        return response.status(200).send(`Nothing to add`);
    }
    let sqlRows = values.map(row => `('${row.name}','${row.month}','${row.day}','${row.group}') `);
    pool.query(`INSERT INTO teams (name, month, day, "group") VALUES ${sqlRows} RETURNING *`, (error, results) => {
        if (error) {
            response.status(400).send(error)
        } else {
            response.status(200).send(`Added to teams`)
        }
    })       
}

const getTeams = (request, response) => {
    pool.query('SELECT * FROM teams ORDER BY points DESC, goals DESC, alt_points DESC, month ASC, day ASC', (error, results) => {
        if (error) {
            response.status(400).send(error)  
        } else {
            response.status(200).send(results.rows)
        }
    })
}

const validateMatch = (match, status) => {
    return new Promise((resolve, reject) => {
        status = status || {}
        status.error = status.error || {}
        if (!match || Object.keys(match).length == 0) {
            status.validated = true;
            return resolve(status);
        }
        pool.query('SELECT * FROM teams WHERE name=$1 or name=$2', [match.team1, match.team2], (err, results) => {
            if (err) {
                status.error = err
                status.validated = false
            }
            if (results.rows.length == 2) {
                status.validated = true
            } else if (results.rows.length == 0) {
                status.error.message = `${match.team1} and ${match.team2} cannot be found in records`
                status.validated = false
            } else if (results.rows.length == 1) {
                let missingTeam = match.team1
                if (results.rows[0].name == missingTeam) {
                    missingTeam = match.team2
                }
                status.error.message  = `${missingTeam} cannot be found in records`
                status.validated = false
            } else {
                error.message = `unknown error`
                status.validated = false
            }
            resolve(status);
        })
    })
}

const getMatches = (request, response) => {
    pool.query('SELECT * FROM matches', (error, results) => {
        if (error) {
            response.status(400).send(error)  
        } else {
            response.status(200).json(results.rows)
        }
    })
}

const deleteAll = (request, response) => {
    pool.query('CALL delete_all()', (error, results) => {
        if (error) {
            response.status(400).send(error)
        } else {
            response.status(200).send(`Deleted all records`)
        }
    })
}

const createMatchesWithUpdate = async function(request, response) {
    try {
        parser.parseMatches(request.body); 
    } catch (error) {
        return response.status(400).send({message: "cannot parse ", cause: error.cause});
    }
    try {
        const values = parser.parseMatches(request.body); 
        for (const index in values) {
            const status = await validateMatch(values[index], {});
            if (!status.validated) {
                status.error.cause = index;
                return response.status(400).send(status.error);
            }
        }
        for (const index in values) {
            const match = values[index];
            const status = new Promise((resolve, reject) => {
                pool.query('CALL insert_match($1, $2, $3, $4)', 
                [match.team1, match.team2, match.score1, match.score2], (error, results) => {
                    if (error) {
                        resolve({'hasError': true, 'error': error});
                    } else {
                        resolve({'hasError': false});
                    }
                });
            });
            if (status.hasError) {
                return response.status(400).send(status.error);
            }
        }
        const actualRowCount = values.filter((match) => Object.keys(match).length != 0).length;
        response.status(200).send(`Rows added: ${actualRowCount}`);
    } catch (error) {
        response.status(400).send(error);
    }         
}

module.exports = {
    createTeams,
    getTeams,
    getMatches,
    deleteAll,
    createMatchesWithUpdate
}