import db from '../db/db';
import uniqid from 'uniqid';


class CropsController {
  // GET ALL CROPS   
  getAllCrops(req, res) {
    return res.status(200).send({
      success:'true',
      message: 'crops retrieved without error',
      crops: db,
    });
  }

  // GET CROP BY ID   
  getCrop(req, res) {
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
  }
  

  // POST NEW CROP  
  createCrop(req, res) {
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
    };
    db.push(crop);
    return res.status(201).send({
      success: 'true',
      message: 'Crop was added successfully',
      crop
    });
  }

  // UPDATE CROP   
  updateCrop(req, res) {
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
  }

  // DELETE CROP BY ID 
  deleteCrop(req, res) {
    const id = req.params.id;
    let cropFound;
    let itemIndex;
  
    db.map((crop, index) => {
      if(crop.id === id) {
        cropFound = crop;
        itemIndex = index;
      }
    });
    
    if(!cropFound) {
        return res.status(404).send({
          success: 'false',
          message:'Crop not found',
        });
    }
    db.splice(itemIndex, 1);

    return res.status(200).send({
      success:'true',
      message: 'Crop deleted without error',
    });
  }
}

const cropController = new CropsController();
export default cropController;