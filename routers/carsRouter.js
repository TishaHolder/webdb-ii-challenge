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

carsRouter.post('/', (req, res) => {

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

carsRouter.put('/:VIN', (req, res) => {
     
    const {VIN} = req.params;
    const changes = req.body;

    carsDB('cars')
    .where ({VIN})
    .update(req.body)
    .then(count => {
        res.status(200).json( {message: `${count} records were updated.`} );
    })
    .catch(error => {
        res.status(500).json( {error: 'There was an error updating the record in the database.'} );
    })


})

carsRouter.delete('/:VIN', (req, res) => {

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


//export router
module.exports = carsRouter;