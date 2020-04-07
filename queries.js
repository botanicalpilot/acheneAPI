require('dotenv').config()

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database, 
    password: process.env.password, 
    port: 5432,
})

// if sending to production don't forget to move config details to separate file w/ permissions

const getCrops = (request, response) => {
    pool.query('SELECT * FROM crops ORDER BY id ASC', (error, results) => {
        if (error) {
            console.log(error)
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCropById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM crops WHERE id = $1', [id], (error, results) => {
        if(error) {
            console.log(error)
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createCrop = (request, response) => {
    const { commonname, scientificname, seeddatespring, startdatespring, seeddatefall, startdatefall } = request.body

    pool.query('INSERT INTO crops (commonname, scientificname, seeddatespring, startdatespring, seeddatefall, startdatefall) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [commonname, scientificname, seeddatespring, startdatespring, seeddatefall, startdatefall], (error, results) => {
        if(error) {
            console.log(error)
            throw error
        }
        response.status(201).send(`Crop added with ID: ${results.insertId}`)
    })
}

const updateCrop = (request, response) => {
    const id = parseInt(request.params.id)
    const { commonname, scientificname, seeddatespring, startdatespring, seeddatefall, startdatefall } = request.body

    pool.query('UPDATE crops SET commonname = $1, scientificname = $2, seeddatespring = $3, startdatespring = $4, seeddatefall = $5, startdatefall = $6 WHERE id = $7', [commonname, scientificname, seeddatespring, startdatespring, seeddatefall, startdatefall, id], (error, results) => {
        if(error) {
            console.log(error)
            throw error
        }
        response.status(201).send(`Crop updated with ID: ${id}`)
        }
    )
}

const deleteCrop = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM crops WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log(error)
            throw error
        }
        response.status(200).send(`Crop deleted with ID: ${id}`)
    })
}

module.exports = {
    getCrops,
    getCropById, 
    createCrop,
    updateCrop,
    deleteCrop
}


