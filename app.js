import express from 'express';
import db from './db/db';

const app = express();

// get all crops
app.get('/api/v1/crops', (req, res) => {
    res.status(200).send({
        success:'true',
        message: 'crops retrieved without error',
        crops: db
    })
})

const PORT 5000; 

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
