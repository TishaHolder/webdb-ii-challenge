//import express
const express = require('express');

//create router
const carsRouter = express.Router();

//import development object
const carsDB = require('../data/dbConfig.js');


//***************************END POINTS*********************/

carsRouter.get('/', (req, res) => {

    carsDB('cars')
    .then(cars => {
        res.status(200).json(cars);
    })
    .catch(error => {
        res.status(500).json( {error: 'There was an error retrieving the cars from the database.'} );
    })
})


carsRouter.get('/:VIN', validateVIN, (req, res) => {

    const {VIN} = req.params;

    carsDB('cars')
    .where( {VIN} )
    .then(car => {
        res.status(200).json(car);
    })
    .catch(error => {
        res.status(500).json( {error: 'There was an error retrieving the car from the database.'} );
    })
})

carsRouter.post('/', validateCarInfo, (req, res) => {

    const carsData = req.body;

    carsDB('cars')
    .insert(carsData, 'id')
    .then( ([id]) => {
        res.status(200).json(id);

    })
    .catch(error => {
        res.status(500).json( {error: 'There was an error adding the record to the database.'} );
    })

})

carsRouter.put('/:VIN', validateVIN, validateCarInfo, (req, res) => {
     
    const {VIN} = req.params;
    const changes = req.body;

    carsDB('cars')
    .where ({VIN})
    .update(req.body)
    .then(count => {
        res.status(200).json( {message: `${count} records were updated.`} );
    })
    .catch(error => {
        console.log("update error", error);
        res.status(500).json( {error: 'There was an error updating the record in the database.'} );
    })

})

carsRouter.delete('/:VIN', validateVIN, (req, res) => {

    const {VIN} = req.params;

    carsDB('cars')
    .where( {VIN} )
    .delete()
    .then(count => {
        res.status(200).json( {message: `${count} record(s) were deleted.`} );
    })
    .catch (error => {
        console.log("delete error", error);
        res.status(500).json( {error: 'There was an error deleting the record(s) from the database.'} );
    })
})

//custom middleware
//custom/local middleware
function validateVIN(req, res, next){

    const {VIN} = req.params;

    carsDB('cars')
    .where( {VIN} )
    .then(car => {
        if( (car.length > 0) ){
            next();
        }
        else {
            res.status(404).json( {message: 'A car with that VIN does not exist.'} );
        }
    })
    

};

function validateCarInfo(req, res, next){

    const carData = req.body;

    if(!carData.make){
        res.status(400).json( {message: 'Missing car make.'} );
    }
    else if(!carData.model){
        res.status(400).json( {message: 'Missing car model.'} );
    }
    else if(!carData.mileage){
        res.status(400).json( {message: 'Missing car mileage.'} );
    }   
    else {
        next();
    }
    

};


//export router
module.exports = carsRouter;