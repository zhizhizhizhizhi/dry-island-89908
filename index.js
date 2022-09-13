const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = os.Getenv("PORT") || 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.text({ type: 'text/*' }))


const db = require('./db')

app.get('/api/teams', db.getTeams)
app.post('/api/teams', db.createTeams)
app.get('/api/matches', db.getMatches)
app.post('/api/matches', db.createMatchesWithUpdate)
app.delete('/api/deleteAll', db.deleteAll)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

const path = require('path');
app.use(express.static(path.resolve(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});