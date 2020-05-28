const express = require('express');
const routes = express.Router();
const controllerPlanet = require('../controllers/controllerPlanet');

routes.post('/planet/save/', controllerPlanet.post);
/**
 * @swagger
 * /planets/:
 *   get:
 *     description: Retorna planetas
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: planets
 *         schema:
 *           type: array
 *           items:
 *              plenet:{
 *                  _id:{
 *                      type: ObjectId
 *                  },
 *                  nome:{
 *                      type: String
 *                  },
 *                  clima:{
 *                      type: String
 *                  },
 *                  terreno:{
 *                      type: String
 *                  }
 *              }
 */
routes.get('/planets/',controllerPlanet.getAll);
routes.get('/planet/:id/',controllerPlanet.getById);
routes.delete('/planet/:id/delete',controllerPlanet.remove);
routes.get('/planet/name/:nome/',controllerPlanet.getByNome);


module.exports = routes;