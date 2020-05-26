const express = require('express');
const routes = express.Router();

routes.post('/planet/save/', require('../controllers/controllerPlanet').post);

module.exports = routes;