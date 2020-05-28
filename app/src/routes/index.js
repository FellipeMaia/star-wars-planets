const express = require('express');
const routes = express.Router();
const controllerPlanet = require('../controllers/controllerPlanet');

routes.post('/planet/save/', controllerPlanet.post);
routes.get('/planets/',controllerPlanet.getAll);
routes.get('/planet/:id/',controllerPlanet.getById);
routes.delete('/planet/:id/delete',controllerPlanet.remove);
routes.get('/planet/name/:nome/',controllerPlanet.getByNome);


module.exports = routes;