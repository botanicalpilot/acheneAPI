const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const helmet = require('helmet')
const compression = require('compression')
const rateLimit = require ('express-rate-limit')
const { body, check } = require('express-validator')


// limit express requests
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 5,
})
const postLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 1,
})
app.use(limiter)


// add compression and HTTP header security
app.use(compression())
app.use(helmet())

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and PostgreSQL  RESTFUL API'})
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`App running on port ${port}.`)
})

app.get('/crops', db.getCrops)
app.get('/crops/:id', db.getCropById)
app.post('/crops', 
// [
//     check('commonname')
//       .not()
//       .isEmpty()
//       .isLength({ min: 2, max: 255 })
//       .trim(),
//     check('scientificname')
//       .not()
//       .isEmpty()
//       .isLength({ min: 2, max: 255 })
//       .trim(),
// ],
postLimiter, 
db.createCrop)
app.put('/crops/:id', db.updateCrop)
app.delete('/crops/:id', db.deleteCrop)
