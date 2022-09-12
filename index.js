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
app.use(bodyParser.text({ type: 'text/*' }))


const db = require('./db')
app.get('/', (request, response) => {
    response.json({ info: 'Test' })
})
app.get('/api/teams', db.getTeams)
app.post('/api/teams', db.createTeam)
app.post('/api/teams/batch', db.createTeams)
app.put('/api/teams', db.updateTeam)
app.get('/api/matches', db.getMatches)
app.post('/api/matches', db.createMatchWithUpdate)
app.post('/api/matches/batch', db.createMatchesWithUpdate)
app.delete('/api/deleteAll', db.deleteAll)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

const path = require('path');
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});