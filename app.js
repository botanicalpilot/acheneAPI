import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';
import uniqid from 'uniqid';

const app = express();

// parse incoming data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all crops
app.get('/api/v1/crops', (req, res) => {
    res.status(200).send({
        success:'true',
        message: 'crops retrieved without error',
        crops: db
    })
})


// post data 
app.post('/api/v1/crops', (req, res) => {
    if(!req.body.crop) {
        return res.status(400).send({
            success: 'false', 
            message: 'Crop is required'
        });
    } else if(!req.body.seedPlantDate){
        return res.status(400).send({
            success: 'false', 
            message: 'Seed planting date is required'
        });
    } else if(!req.body.startPlantDate){
        return res.status(400).send({
            success: 'false', 
            message: 'Starts planting date is required'
        });
    }
    const crop = {
        id: uniqid(),
        crop: req.body.crop,
        seedPlantDate: req.body.seedPlantDate,
        startPlantDate: req.body.startPlantDate,
    }
    db.push(crop);
    return res.status(201).send({
        success: 'true',
        message: 'Crop was added successfully',
        crop
    })
});

app.get('/api/v1/crops/:id', (req, res) => {
    const id = req.params.id
    db.map((crop) => {
        if(crop.id === id) {
            return res.status(200).send({
                success: 'true',
                message: 'Crop retrieved successfully',
                crop,
            });
        }
    });

    return res.status(404).send({
        success: 'false',
        message: 'Sorry, crop does not exist',
    });

});



const PORT = 5000; 

// ceate a web server with app.listen
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
