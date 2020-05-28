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
                JSON.parse(JSON.stringify(await(new planetModel({"nome": "Tatooine","terreno": "desert","clima": "arid"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"nome": "Alderaan","terreno": "grasslands, mountains","clima": "temperate"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"nome": "Yavin IV","terreno": "jungle, rainforests","clima": "temperate, tropical"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"nome": "Stewjon","terreno": "grass","clima": "temperate"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"nome": "terra","terreno": "desert, mountains, jungle, rainforests","clima": "temperate, tropical, arid"})).save())),
            ],
            result:[
                {films:5},// {"nome": "Tatooine",films:5},
                {films:2},// {"nome": "Alderaan",films:2},
                {films:1},// {"nome": "Yavin IV",films:1},
                {films:0},// {"nome": "Stewjon",films:0},
                {films:'Sem registo!'},// {"nome": "terra",films:'Sem registo!'},
            ]
        };
    });

    afterEach(async ()=>{
        virtual_mongodb.clearDatabase();
    })

    afterAll(async()=>{
        virtual_mongodb.closeDatabase();
    });

    it('vai testar a rota /planet/save/ utilizado o metodo post', async done=>{
        const parms = {"nome": "Ord Mantell","terreno": "plains, seas, mesas","clima": "temperate"}
        
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
       
        for(let i=0;i<planets.obj.length;i++){
            planets.obj[i]['films'] = planets.result[i].films;
        };

        const retorno = await request(app)
        .get('/planets/')
        .set('Content-Type','application/json; charset=utf-8')
        .send();

        console.log(retorno.body);

        expect(retorno.statusCode).toBe(200);
        expect(retorno.body).toEqual(planets.obj);

        done()

    });

    it('vai testar a rota /planets/ utilizado o metodo get, com o retorno da mensagem "Não há planeta!"', async done=>{
       
        virtual_mongodb.clearDatabase();

        const retorno = await request(app)
        .get('/planets/')
        .set('Content-Type','application/json; charset=utf-8')
        .send();

        console.log(retorno.body);

        expect(retorno.statusCode).toBe(200);
        expect(retorno.body.length).toEqual(0);
        expect(retorno.body).toEqual([]);

        done()

    });

    it('vai testar a rota /planet/:id utilizado o metodo get', async done=>{
        
        planets.obj[0].films = planets.result[0].films;

        const received = await request(app)
        .get(`/planet/${planets.obj[0]._id}/`)
        .set('Content-Type','application/json; charset=utf-8')
        .send();

        expect(received.statusCode).toBe(200);
        expect(received.body).toEqual(planets.obj[0]);

        done()

    });

    it('vai testar a rota /planet/:id utilizado o metodo get, com o retorno da mensagem "Não há planeta com o _id:"', async done=>{
        
        const expected = planets.obj[0];

        const id = expected._id.substring(0,expected._id.length-4)+'7777';
        console.log(id+'\n'+expected._id);

        const received = await request(app)
        .get(`/planet/${id}/`)
        .set('Content-Type','application/json; charset=utf-8')
        .send();

        console.log(received.body)

        expect(received.statusCode).toBe(200);
        expect(received.body).toBe(null);

        done()

    });

    it('vai testar a rota /planet/nome/:nome utilizado o metodo get', async done =>{

        planets.obj[0].films = planets.result[0].films;

        const received = await request(app)
        .get(`/planet/name/${planets.obj[0].nome}/`)
        .set('Content-Type','application/json; charset=utf-8')
        .send();

        expect(received.statusCode).toBe(200);
        expect(received.body.length).toBe(1);
        expect(received.body[0]).toEqual(planets.obj[0]);

        done();

    });

    it('vai testar a rota /planet/nome/:nome utilizado o metodo get, com o retorno da mensagem "Não há planeta com o nome:"', async done =>{

        const received = await request(app)
        .get(`/planet/name/Ord Mantell/`)
        .set('Content-Type','application/json; charset=utf-8')
        .send();

        expect(received.statusCode).toBe(200);
        expect(received.body.length).toBe(0)
        expect(received.body).toEqual([]);

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

