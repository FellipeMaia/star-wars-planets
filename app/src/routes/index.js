const express = require('express');
const routes = express.Router();

routes.post('/planet/save/', require('../controllers/controllerPlanet').post);

console.log(require('../controllers/controllerPlanet').teste.validarNome('teste'));

module.exports = routes;