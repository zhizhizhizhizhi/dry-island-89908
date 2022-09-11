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
app.get('/', (request, response) => {
    response.json({ info: 'Test' })
})
app.get('/teams', db.getTeams)
app.post('/teams', db.createTeam)
app.put('/teams', db.updateTeam)
app.get('/matches', db.getMatches)
app.post('/matches', db.createMatchWithUpdate)
app.delete('/', db.deleteAll)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})