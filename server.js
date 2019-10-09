//import express
const express = require ('express');

//create a server application
const server = express();

//global middleware
//middleware to use json
server.use(express.json());

//import cars router
const carsRouter = require('./routers/carsRouter.js');

//mount cars Router
server.use('/api/cars', carsRouter);

//export server
module.exports = server;