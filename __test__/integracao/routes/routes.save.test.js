const {planetModel} = require('../../../app/src/models/planet');
const virtual_mongodb = require('../../_ultil/virtual-mongodb');

const request = require('supertest');
const app = require('../../../app/config/server').app;

let planets;

describe("Test of the route /planet/ with method post",()=>{
    
    beforeAll(async ()=>{
        await virtual_mongodb.connect();
    })

    beforeEach(async ()=>{
        planets = {
            obj:[
                JSON.parse(JSON.stringify(await(new planetModel({"name": "Tatooine","terrain": "desert","climate": "arid"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"name": "Alderaan","terrain": "grasslands, mountains","climate": "temperate"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"name": "Yavin IV","terrain": "jungle, rainforests","climate": "temperate, tropical"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"name": "Stewjon","terrain": "grass","climate": "temperate"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"name": "terra","terrain": "desert, mountains, jungle, rainforests","climate": "temperate, tropical, arid"})).save())),
            ],
            result:[
                {films:5},// {"name": "Tatooine",films:5},
                {films:2},// {"name": "Alderaan",films:2},
                {films:1},// {"name": "Yavin IV",films:1},
                {films:0},// {"name": "Stewjon",films:0},
                {films:'Without registration!'},// {"name": "terra",films:'Sem registo!'},
            ]
        };
    });

    afterEach(async ()=>{
        virtual_mongodb.clearDatabase();
    })

    afterAll(async()=>{
        virtual_mongodb.closeDatabase();
    });

    it('should verify if the planet was save to database', async done=>{
        const parms = {"name": "Ord Mantell","terrain": "plains, seas, mesas","climate": "temperate"}
        
        request(app)
        .post('/planet/')
        .set('Content-Type','application/json; charset=utf-8')
        .send(parms).then(received=>{

            expect(received.statusCode).toBe(200);
            expect(received.body.result.name).toBe(parms.name);
            expect(received.body.result.terrain).toBe(parms.terrain);
            expect(received.body.result.climate).toBe(parms.climate);
    
            done();

        })



    });

    it('vai testar a rota /planet/ utilizado o metodo post, retornando erro de campo "name" vazio', async done=>{
        const parms = {"name": "","terrain": "plains, seas, mesas","climate": "temperate"}
        
        request(app)
        .post('/planet/')
        .set('Content-Type','application/json; charset=utf-8')
        .send(parms).then(received=>{

            expect(received.statusCode).toBe(405);
            expect(received.body.error).toBe("Campo invalido!\n --> ValidationError: planet validation failed: name: Path `name` is required.");
    
            done();

        });


    });


    it('vai testar a rota /planet/ utilizado o metodo post, retornando erro de campo "terrain" vazio', async done=>{
        const parms = {"name": "Ord Mantell","terrain": "","climate": "temperate"}
        
        request(app)
        .post('/planet/')
        .set('Content-Type','application/json; charset=utf-8')
        .send(parms).then(received=>{

            expect(received.statusCode).toBe(405);
            expect(received.body.error).toBe("Campo invalido!\n --> ValidationError: planet validation failed: terrain: Path `terrain` is required.");
    
            done();
    
        })

    });


    it('vai testar a rota /planet/ utilizado o metodo post, retornando erro de campo "climate" vazio', async done=>{
        const parms = {"name": "Ord Mantell","terrain": "plains, seas, mesas","climate": ""}
        
        const received = await request(app)
        .post('/planet/')
        .set('Content-Type','application/json; charset=utf-8')
        .send(parms).then(received=>{

            expect(received.statusCode).toBe(405);
            expect(received.body.error).toBe("Campo invalido!\n --> ValidationError: planet validation failed: climate: Path `climate` is required.");
    
            done();
    
        })

    });

});