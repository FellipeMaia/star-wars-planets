const request = require('supertest');
const {planetModel} = require('../../../app/src/models/planet');

const startConnction = require('../../../app/config/database').startConnction;

const app = require('../../../app/config/server').app;

describe("Teste de Rota",()=>{

    beforeAll(async ()=>{
        await startConnction();
    })

    beforeEach(async ()=>{
        await planetModel.deleteMany({});
    });

    afterAll(async()=>{
        await mongoose.close()
    })

    it('vai testar a rota /planet/save/ utilixado o metodo post', async ()=>{
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

    })
});