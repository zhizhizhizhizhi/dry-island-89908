const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const db = require('./db')

app.get('/teams', db.getTeams)
app.post('/teams', db.createTeam)
app.put('/teams/:name', db.updateTeam)
app.get('/matches', db.getMatches)
app.post('/matches', db.createMatch)
app.delete('/', db.deleteAll)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})