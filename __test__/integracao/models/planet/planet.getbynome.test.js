const {planetModel,planet} = require('../../../../app/src/models/planet');
const virtual_mongodb = require('../../../_ultil/virtual-mongodb');

let planets;

describe("Metodo getByNome do modulo Planet",()=>{

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


    it('vai verificar o retorno de planet filtando por nome', async done=>{
        const expected = planets.obj[0];

        const received =  JSON.parse(JSON.stringify(await planet.getByNome(expected.nome)));

        expect(received.length).toBe(1);
        expect(received[0]).toEqual(expected);

        done();
    });

    it('vai verificar o retorno de planet filtando por nome quando esta vazio', async done=>{
       
        const received =  JSON.parse(JSON.stringify(await planet.getByNome('teste-not-have')));

        expect(received.length).toBe(0);
        expect(received).toEqual([]);

        done();
    });

    it('vai verificar o retorno de planet filtando por nome quando esta retornando erro', async done=>{
        
        virtual_mongodb.disconnect();

        await planet.getByNome('teste999')
        .catch(received=>{
            expect(received.name).toEqual("MongoError");
            expect(received.message).toEqual("pool is draining, new operations prohibited");
        });

        await virtual_mongodb.connect();
        
        done();
    });



});