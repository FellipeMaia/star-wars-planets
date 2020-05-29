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

    it('vai testar a rota /planet/ utilizado o metodo post', async done=>{
        const parms = {"nome": "Ord Mantell","terreno": "plains, seas, mesas","clima": "temperate"}
        
        const retorno = await request(app)
        .post('/planet/')
        .set('Content-Type','application/json; charset=utf-8')
        .send(parms);

        expect(retorno.statusCode).toBe(200);
        expect(retorno.body.result.nome).toBe(parms.nome);
        expect(retorno.body.result.terreno).toBe(parms.terreno);
        expect(retorno.body.result.clima).toBe(parms.clima);

        done();

    });

    it('vai testar a rota /planet/ utilizado o metodo post, retornando erro', async done=>{
        const parms = {"nome": "","terreno": "plains, seas, mesas","clima": "temperate"}
        
        const received = await request(app)
        .post('/planet/')
        .set('Content-Type','application/json; charset=utf-8')
        .send(parms);

        expect(received.statusCode).toBe(400);
        expect(received.body.error).toBe("Campo invalido!\n --> ValidationError: planet validation failed: nome: Path `nome` is required.");

        done();

    });


    it('vai testar a rota /planet/ utilizado o metodo post, retornando erro', async done=>{
        const parms = {"nome": "Ord Mantell","terreno": "","clima": "temperate"}
        
        const received = await request(app)
        .post('/planet/')
        .set('Content-Type','application/json; charset=utf-8')
        .send(parms);

        expect(received.statusCode).toBe(400);
        expect(received.body.error).toBe("Campo invalido!\n --> ValidationError: planet validation failed: terreno: Path `terreno` is required.");

        done();

    });


    it('vai testar a rota /planet/ utilizado o metodo post, retornando erro', async done=>{
        const parms = {"nome": "Ord Mantell","terreno": "plains, seas, mesas","clima": ""}
        
        const received = await request(app)
        .post('/planet/')
        .set('Content-Type','application/json; charset=utf-8')
        .send(parms);

        expect(received.statusCode).toBe(400);
        expect(received.body.error).toBe("Campo invalido!\n --> ValidationError: planet validation failed: clima: Path `clima` is required.");

        done();

    });


    it('vai testar a rota /planets/ utilizado o metodo get', async done=>{
        
        const expected = [];
        for(let i=0;i<planets.obj.length;i++){
            expected.push(Object.assign(planets.obj[i], planets.result[i]));
        };

        console.log(expected)

        const retorno = await request(app)
        .get('/planets/')
        .set('Content-Type','application/json; charset=utf-8')
        .send();

        expect(retorno.statusCode).toBe(200);
        expect(retorno.body.result).toEqual(expected);

        done()

    },10000);

    it('vai testar a rota /planets/ utilizado o metodo get, com o retorno da mensagem "Não há planeta!"', async done=>{
       
        virtual_mongodb.clearDatabase();

        const retorno = await request(app)
        .get('/planets/')
        .set('Content-Type','application/json; charset=utf-8')
        .send();

        console.log(retorno.body);

        expect(retorno.statusCode).toBe(200);
        expect(retorno.body.result.length).toEqual(0);
        expect(retorno.body.result).toEqual([]);

        done()

    });

    it('vai testar a rota /planet/id/:id utilizado o metodo get', async done=>{
        
        planets.obj[0].films = planets.result[0].films;

        const received = await request(app)
        .get(`/planet/id/${planets.obj[0]._id}/`)
        .set('Content-Type','application/json; charset=utf-8')
        .send();

        expect(received.statusCode).toBe(200);
        expect(received.body.result).toEqual(planets.obj[0]);

        done()

    });

    it('vai testar a rota /planet/id/:id utilizado o metodo get, com o retorno da mensagem "Não há planeta com o _id:"', async done=>{
        
        const expected = planets.obj[0];

        const id = expected._id.substring(0,expected._id.length-4)+'7777';
        console.log(id+'\n'+expected._id);

        const received = await request(app)
        .get(`/planet/id/${id}/`)
        .set('Content-Type','application/json; charset=utf-8')
        .send();

        console.log(received.body)

        expect(received.statusCode).toBe(200);
        expect(received.body.result).toBe(null);

        done()

    });

    it('vai testar a rota /planet/nome/:nome utilizado o metodo get', async done =>{

        planets.obj[0].films = planets.result[0].films;

        const received = await request(app)
        .get(`/planet/nome/${planets.obj[0].nome}/`)
        .set('Content-Type','application/json; charset=utf-8')
        .send();

        expect(received.statusCode).toBe(200);
        expect(received.body.result.length).toBe(1);
        expect(received.body.result[0]).toEqual(planets.obj[0]);

        done();

    });

    it('vai testar a rota /planet/nome/:nome utilizado o metodo get, com o retorno da mensagem "Não há planeta com o nome:"', async done =>{

        const received = await request(app)
        .get(`/planet/nome/Ord Mantell/`)
        .set('Content-Type','application/json; charset=utf-8')
        .send();

        expect(received.statusCode).toBe(200);
        expect(received.body.result.length).toBe(0)
        expect(received.body.result).toEqual([]);

        done();

    });

    it('vai testar a rota /planet/:id/ utilizado o metodo delete', async done =>{
        const received = await request(app)
        .delete(`/planet/${planets.obj[0]._id}/`)
        .set('Content-Type','application/json; charset=utf-8')
        .send();

        expect(received.statusCode).toBe(200);
        expect(received.body.result).toEqual(planets.obj[0]);

        done();

    });

});

