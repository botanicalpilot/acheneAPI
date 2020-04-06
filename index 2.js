const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port  = 3000
const db = require('./queries')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and PostgreSQL  RESTFUL API'})
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

app.get('/crops', db.getCrops)
app.get('/crops/:id', db.getCropById)
app.post('/crops', db.createCrop)
app.put('/crops/:id', db.updateCrop)
app.delete('/crops/:id', db.deleteCrop)
