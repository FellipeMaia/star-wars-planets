const {planetModel} = require('../../../app/src/models/planet');
const virtual_mongodb = require('../../_ultil/virtual-mongodb');

const request = require('supertest');
const app = require('../../../app/config/server').app;

let planets;

describe("Test of the route /planets/ with method get",()=>{
    
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
                JSON.parse(JSON.stringify(await(new planetModel({"name": "Bespin","terrain": "gas giant","climate": "temperate"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"name": "Coruscant","terrain": "cityscape, mountains","climate": "temperate"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"name": "Naboo","terrain": "grassy hills, swamps, forests, mountains","climate": "temperate"})).save())),
            ],
            result:[
                {films:5},// {"name": "Tatooine",films:5},
                {films:2},// {"name": "Alderaan",films:2},
                {films:1},// {"name": "Yavin IV",films:1},
                {films:0},// {"name": "Stewjon",films:0},
                {films:'Without registration!'},// {"name": "terra",films:'Sem registo!'},
                {films:1},// {"name": "Alderaan",films:2},
                {films:4},// {"name": "Yavin IV",films:1},
                {films:4},// {"name": "Stewjon",films:0},
            ]
        };
    });

    afterEach(async ()=>{
        virtual_mongodb.clearDatabase();
    })

    afterAll(async()=>{
        virtual_mongodb.closeDatabase();
    });

    it('should verify the return of the planet list', async done=>{
        
        const expected = [];
        for(let i=0;i<planets.obj.length;i++){
            expected.push(Object.assign(planets.obj[i], planets.result[i]));
        };

        //console.log(expected)

        request(app)
        .get('/planets/')
        .set('Content-Type','application/json; charset=utf-8')
        .send().then(received=>{

            expect(received.statusCode).toBe(200);
            expect(received.body.result).toEqual(expected);
    
            done()
    
        });

      
    },10000);


    it('should verify the return of the planet list setting limit = 2 and page = 3', async done=>{
        
        const expected = [];
            expected.push(Object.assign(planets.obj[4], planets.result[4]));
            expected.push(Object.assign(planets.obj[5], planets.result[5]));

        //console.log(expected)

        request(app)
        .get('/planets/').set('limit',2).set('page',3)
        .set('Content-Type','application/json; charset=utf-8')
        .send().then(received=>{

            expect(received.statusCode).toBe(200);
            expect(received.body.result).toEqual(expected);
    
            done()
    
        });

      
    },10000);


    it('should verify if the returns an error message when value of limit and page are invalid', async done=>{
        
        const expected = [];
            expected.push(Object.assign(planets.obj[4], planets.result[4]));
            expected.push(Object.assign(planets.obj[5], planets.result[5]));

        //console.log(expected)

        request(app)
        .get('/planets/').set('limit','A').set('page','B')
        .set('Content-Type','application/json; charset=utf-8')
        .send().then(received=>{
            expect(received.statusCode).toBe(405);
            expect(received.body.error).toEqual('ConversionError: String com caracteres invalidos para conversão.');
    
            done();
    
        });

      
    });


    it('should verify the if the list is empty', async done=>{
       
        planetModel.deleteMany({}).then(()=>{
            return request(app)
                .get('/planets/')
                .set('Content-Type','application/json; charset=utf-8')
                .send()
        }).then(retorno=>{

            expect(retorno.get('total-page')).toBe('0');
            expect(retorno.statusCode).toBe(200);
            expect(retorno.body.result.length).toEqual(0);
            expect(retorno.body.result).toEqual([]);
    
            done()

        });


    });


});