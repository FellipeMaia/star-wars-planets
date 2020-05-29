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
 *                - name
 *                - climate
 *                - terrain
 *             properties:
 *                name:
 *                   example: "Yavin IV"
 *                   type: String
 *                climate:
 *                   example: "temperate, tropical"
 *                   type: String
 *                terrain:
 *                   example: "jungle, rainforests"
 *                   type: String
 *     responses:
 *       200:
 *         description: planet
 *         schema:
 *           type: object
 *           properties:
 *              result:
 *                  type: "object"
 *                  properties:
 *                     _id:
 *                        example: "5ece79eb5515b142874ee5c2"
 *                        type: String
 *                     name:
 *                        example: "Yavin IV"
 *                        type: String
 *                     climate:
 *                        example: "temperate, tropical"
 *                        type: String
 *                     terrain:
 *                        example: "jungle, rainforests"
 *                        type: String
 *       405:
 *         description: "Validation exception"
 *         schema:
 *           type: object
 *           properties:
 *              error:
 *                 example: "Campo invalido!\n --> ValidationError: planet validation failed: name: Path `name` is required."
 *                 type: String
 *       500:
 *         description: "Internal Server Error"
 *         schema:
 *           type: object
 *           properties:
 *              error:
 *                 example: "Não foi possivel salvar o planeta!\n --> MongoError: pool is draining, new operations prohibited"
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
 *     parameters:
 *        - name: limit
 *          in: header
 *          description: "Tamanho da pagina\n limit maximo é de 100 itens\nValor padrão é 10"
 *          required: false
 *          schema:
 *              type: Integer
 *        - name: page
 *          in: header
 *          description: "o numero da pagina que deseja receber\nValor padráo é 1"
 *          required: false
 *          schema:
 *              type: Integer
 *     responses:
 *       200:
 *         description: Retorna todos os planetas
 *         headers:
 *           total-page:
 *              description: Total de paginas disponiveis 
 *              schema:
 *                  type: integer
 *                  example: 2
 *         schema:
 *           type: object
 *           properties:
 *              result:
 *                  type: "array"
 *                  items:
 *                     properties:
 *                        _id:
 *                           example: "5ece79eb5515b142874ee5c2"
 *                           type: String
 *                        name:
 *                           example: "Yavin IV"
 *                           type: String
 *                        climate:
 *                           example: "temperate, tropical"
 *                           type: String
 *                        terrain:
 *                           example: "jungle, rainforests"
 *                           type: String
 *                        filmes:
 *                           example: 1
 *                           type: Integer
 *       405:
 *         description: "Validation exception"
 *         schema:
 *           type: object
 *           properties:
 *              error:
 *                 example: "ConversionError: String com caracteres invalidos para conversão."
 *                 type: String    
 *       500:
 *         description: "Internal Server Error"
 *         schema:
 *           type: object
 *           properties:
 *              error:
 *                 example: "Não foi possivel salvar o planeta!\n --> MongoError: pool is draining, new operations prohibited"
 *                 type: String  
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
 *              result:
 *                  type: "object"
 *                  properties:
 *                     _id:
 *                        example: 5ece79eb5515b142874ee5c2
 *                        type: String
 *                     name:
 *                        example: Yavin IV
 *                        type: String
 *                     climate:
 *                        example: temperate, tropical
 *                        type: String
 *                     terrain:
 *                        example: jungle, rainforests
 *                        type: String
 *       500:
 *         description: "Internal Server Error"
 *         schema:
 *           type: object
 *           properties:
 *              error:
 *                 example: "Não foi possivel salvar o planeta!\n --> MongoError: pool is draining, new operations prohibited"
 *                 type: String
 */
routes.get('/planet/id/:id/',controllerPlanet.getById);


/**
 * @swagger
 * /planet/name/{name}/:
 *   get:
 *     tags:
 *        - "Planetas"
 *     description: ""
 *     summary: Pesquisar planeta por name
 *     produces:
 *      - application/json
 *     parameters:
 *        - name: name
 *          in: path
 *          description: "name do planeta.\nexemplo: Yavin IV"
 *          required: true
 *     responses:
 *       200:
 *         description: Retorna uma lista de planetas
 *         schema:
 *           type: object
 *           properties:
 *              result:
 *                  type: "object"
 *                  properties:
 *                     _id:
 *                        example: 5ed026b598fdd549bf2006f3
 *                        type: String
 *                     name:
 *                        example: Yavin IV
 *                        type: String
 *                     climate:
 *                        example: temperate, tropical
 *                        type: String
 *                     terrain:
 *                        example: jungle, rainforests
 *                        type: String
 *       500:
 *         description: "Internal Server Error"
 *         schema:
 *           type: object
 *           properties:
 *              error:
 *                 example: "Não foi possivel salvar o planeta!\n --> MongoError: pool is draining, new operations prohibited"
 *                 type: String
 */
routes.get('/planet/name/:name/',controllerPlanet.getByName);


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
 *              result:
 *                  type: "object"
 *                  properties:
 *                     _id:
 *                        example: 5ed026b598fdd549bf2006f3
 *                        type: String
 *                     name:
 *                        example: Yavin IV
 *                        type: String
 *                     climate:
 *                        example: temperate, tropical
 *                        type: String
 *                     terrain:
 *                        example: jungle, rainforests
 *                        type: String
 *       500:
 *         description: "Internal Server Error"
 *         schema:
 *           type: object
 *           properties:
 *              error:
 *                 example: "Não foi possivel salvar o planeta!\n --> MongoError: pool is draining, new operations prohibited"
 *                 type: String
 */
routes.delete('/planet/:id/',controllerPlanet.remove);


module.exports = routes;