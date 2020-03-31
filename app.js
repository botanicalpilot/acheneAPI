import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';
import uniqid from 'uniqid';

const app = express();

// parse incoming data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 5000; 

// create a web server with app.listen
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});




/* * *
CRUD FUNCTIONALITY
* * */

// GET ALL CROPS
app.get('/api/v1/crops', (req, res) => {
  res.status(200).send({
    success:'true',
    message: 'crops retrieved without error',
    crops: db
    })
})



// POST NEW CROP
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



// GET CROP BY ID
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



// DELETE CROP
app.delete('/api/v1/crops/:id', (req, res) => {
  const id = req.params.id;

  db.map((crop, index) => {
    if(crop.id === id) {
      db.splice(index, 1);
      return res.status(200).send({
      success: 'true',
      message: 'Crop deleted',
      });

    }
  });
    
  return res.status(404).send({
    success: 'false',
    message: 'Crop not found', 
  });
});



// UPDATE CROP
app.put('/api/v1/crops/:id', (req,res) => {
  const id = req.params.id
  let cropFound;
  let itemIndex;
  db.map((crop, index) => {
      if (crop.id === id) {
          cropFound = crop;
          itemIndex = index;
      }
  });

  if (!cropFound) {
      return res.status(404).send({
          success: 'false',
          message: "Crop not found",
      });
  }
  
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

  const updatedCrop = {
      id: cropFound.id,
      crop: req.body.crop || cropFound.title,
      seedPlantDate: req.body.seedPlantDate || cropFound.seedPlantDate,
      startPlantDate: req.body.startPlantDate || cropFound.startPlantDate,
  };

  db.splice(itemIndex, 1, updatedCrop);

  return res.status(201).send({
      success: 'true',
    message: 'Crop was updated',
    updatedCrop,
  });
});






