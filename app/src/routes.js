const express = require('express');
const routes = express.Router();
const controllerPlanet = require('./controllers/controllerPlanet');

/**
 * @swagger
 * tags:
 *  - name: "Planetas"
 *    description: "Tudo sobre planetas"
 */


 /**
 * @swagger
 * /planet/:
 *   post:
 *     tags:
 *        - "Planetas"
 *     description: ""
 *     summary: Salva um novo planeta
 *     produces:
 *      - application/json
 *     parameters:
 *        - name: BODY
 *          in: body
 *          description: Dados necessario para salvar um planta
 *          required: true
 *          schema:
 *             type: object
 *             required:
 *                - nome
 *                - clima
 *                - terreno
 *             properties:
 *                nome:
 *                   example: "Yavin IV"
 *                   type: String
 *                clima:
 *                   example: "temperate, tropical"
 *                   type: String
 *                terreno:
 *                   example: "jungle, rainforests"
 *                   type: String
 *     responses:
 *       200:
 *         description: planet
 *         schema:
 *           type: object
 *           properties:
 *              _id:
 *                 example: "5ece79eb5515b142874ee5c2"
 *                 type: String
 *              nome:
 *                 example: "Yavin IV"
 *                 type: String
 *              clima:
 *                 example: "temperate, tropical"
 *                 type: String
 *              terreno:
 *                 example: "jungle, rainforests"
 *                 type: String
 */
routes.post('/planet/', controllerPlanet.save);

/**
 * @swagger
 * /planets/:
 *   get:
 *     tags:
 *        - "Planetas"
 *     description: ""
 *     summary: Retorna todos os planetas
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Retorna todos os planetas
 *         schema:
 *           type: object
 *           properties:
 *              _id:
 *                 example: "5ece79eb5515b142874ee5c2"
 *                 type: String
 *              nome:
 *                 example: "Yavin IV"
 *                 type: String
 *              clima:
 *                 example: "temperate, tropical"
 *                 type: String
 *              terreno:
 *                 example: "jungle, rainforests"
 *                 type: String
 *              filmes:
 *                 example: 1
 *                 type: Integer
 *              
 */
routes.get('/planets/',controllerPlanet.getAll);

/**
 * @swagger
 * /planet/id/{id}/:
 *   get:
 *     tags:
 *        - "Planetas"
 *     description: ""
 *     summary: Pesquisar planeta por ID
 *     produces:
 *      - application/json
 *     parameters:
 *        - name: id
 *          in: path
 *          description: "id do planeta.\nexemplo: 5ed026b598fdd549bf2006f3"
 *          required: true
 *     responses:
 *       200:
 *         description: Retorna um planeta
 *         schema:
 *           type: object
 *           properties:
 *              _id:
 *                 example: 5ece79eb5515b142874ee5c2
 *                 type: String
 *              nome:
 *                 example: Yavin IV
 *                 type: String
 *              clima:
 *                 example: temperate, tropical
 *                 type: String
 *              terreno:
 *                 example: jungle, rainforests
 *                 type: String
 */
routes.get('/planet/id/:id/',controllerPlanet.getById);


/**
 * @swagger
 * /planet/nome/{nome}/:
 *   get:
 *     tags:
 *        - "Planetas"
 *     description: ""
 *     summary: Pesquisar planeta por nome
 *     produces:
 *      - application/json
 *     parameters:
 *        - name: nome
 *          in: path
 *          description: "nome do planeta.\nexemplo: Yavin IV"
 *          required: true
 *     responses:
 *       200:
 *         description: Retorna uma lista de planetas
 *         schema:
 *           type: object
 *           properties:
 *              _id:
 *                 example: 5ed026b598fdd549bf2006f3
 *                 type: String
 *              nome:
 *                 example: Yavin IV
 *                 type: String
 *              clima:
 *                 example: temperate, tropical
 *                 type: String
 *              terreno:
 *                 example: jungle, rainforests
 *                 type: String
 */
routes.get('/planet/nome/:nome/',controllerPlanet.getByNome);


/**
 * @swagger
 * /planet/{id}/:
 *   delete:
 *     tags:
 *        - "Planetas"
 *     description: ""
 *     summary: Vai apagar um planeta
 *     produces:
 *      - application/json
 *     parameters:
 *        - name: id
 *          in: path
 *          description: "Id do planeta.\nexemplo: 5ece79eb5515b142874ee5c2"
 *          required: true
 *     responses:
 *       200:
 *         description: Retorna o planeta removido
 *         schema:
 *           type: object
 *           properties:
 *              _id:
 *                 example: 5ed026b598fdd549bf2006f3
 *                 type: String
 *              nome:
 *                 example: Yavin IV
 *                 type: String
 *              clima:
 *                 example: temperate, tropical
 *                 type: String
 *              terreno:
 *                 example: jungle, rainforests
 *                 type: String
 */
routes.delete('/planet/:id/',controllerPlanet.remove);


module.exports = routes;