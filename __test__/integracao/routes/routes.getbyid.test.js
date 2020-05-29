const {planetModel} = require('../../../app/src/models/planet');
const virtual_mongodb = require('../../_ultil/virtual-mongodb');

const request = require('supertest');
const app = require('../../../app/config/server').app;

let planets;

describe("Test of the route /planet/id/:id with methodo get",()=>{
    
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


    it('should verify the return of the planet filtering by _ID', async done=>{
        
        planets.obj[0].films = planets.result[0].films;

        const received = await request(app)
        .get(`/planet/id/${planets.obj[0]._id}/`)
        .set('Content-Type','application/json; charset=utf-8')
        .send();

        expect(received.statusCode).toBe(200);
        expect(received.body.result).toEqual(planets.obj[0]);

        done()

    },10000);

    it('should verify the return of the planet filtering by _ID, when the _ID is invalid', async done=>{
        
        const expected = planets.obj[0];

        const id = expected._id.substring(0,expected._id.length-4)+'7777';
        //console.log(id+'\n'+expected._id);

        const received = await request(app)
        .get(`/planet/id/${id}/`)
        .set('Content-Type','application/json; charset=utf-8')
        .send();

        //console.log(received.body)

        expect(received.statusCode).toBe(200);
        expect(received.body.result).toBe(null);

        done()

    });




});