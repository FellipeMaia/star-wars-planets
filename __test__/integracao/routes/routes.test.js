const request = require('supertest');
const {planetModel,mongoose} = require('../../../app/src/models/planet');
const virtual_mongodb = require('../../_ultil/virtual-mongodb');

const app = require('../../../app/config/server').app;

let planets;

describe("Teste de Rota",()=>{
    
    beforeAll(async ()=>{
        await virtual_mongodb.connect();
    })

    beforeEach(async ()=>{
        planets = {
            obj:[
                JSON.parse(JSON.stringify(await(new planetModel({"nome": "teste31","terreno": "teste31","clima": "teste31"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"nome": "teste32","terreno": "teste32","clima": "teste32"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"nome": "teste33","terreno": "teste33","clima": "teste33"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"nome": "teste34","terreno": "teste34","clima": "teste34"})).save())),
            ]
        }
    });

    afterEach(async ()=>{
        virtual_mongodb.clearDatabase();
    })

    afterAll(async()=>{
        virtual_mongodb.closeDatabase();
    });

    it('vai testar a rota /planet/save/ utilizado o metodo post', async done=>{
        const parms = {
            "nome": "teste",
            "terreno": "teste",
            "clima": "teste"
        }
        
        const retorno = await request(app)
        .post('/planet/save/')
        .set('Content-Type','application/json; charset=utf-8')
        .send(parms);

        expect(retorno.statusCode).toBe(200);
        expect(retorno.body.nome).toBe(parms.nome);
        expect(retorno.body.terreno).toBe(parms.terreno);
        expect(retorno.body.clima).toBe(parms.clima);

        done();

    });

    it('vai testar a rota /planets/ utilizado o metodo get', async done=>{
       
        const retorno = await request(app)
        .get('/planets/')
        .set('Content-Type','application/json; charset=utf-8')
        .send();

        expect(retorno.statusCode).toBe(200);
        expect(retorno.body).toEqual(planets.obj);

        done()

    });

    it('vai testar a rota /planet/:id utilizado o metodo get', async done=>{
        
        const received = await request(app)
        .get(`/planet/${planets.obj[0]._id}/`)
        .set('Content-Type','application/json; charset=utf-8')
        .send();

        expect(received.statusCode).toBe(200);
        expect(received.body).toEqual(planets.obj[0]);

        done()

    });

    it('vai testar a rota /planet/nome/:nome utilizado o metodo get', async done =>{
        const received = await request(app)
        .get(`/planet/name/${planets.obj[0].nome}/`)
        .set('Content-Type','application/json; charset=utf-8')
        .send();

        expect(received.statusCode).toBe(200);
        expect(received.body.length).toBe(1);
        expect(received.body[0]).toEqual(planets.obj[0]);

        done();

    });

    it('vai testar a rota /planet/:id/delete utilizado o metodo delete', async done =>{
        const received = await request(app)
        .delete(`/planet/${planets.obj[0]._id}/delete`)
        .set('Content-Type','application/json; charset=utf-8')
        .send();

        expect(received.statusCode).toBe(200);
        expect(received.body).toEqual(planets.obj[0]);

        done();

    });

});

