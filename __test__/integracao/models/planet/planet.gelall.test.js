const {planetModel,planet} = require('../../../../app/src/models/planet');
const virtual_mongodb = require('../../../_ultil/virtual-mongodb');

let planets;

describe("Metodo getAll do moulo Planet",()=>{

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


    it('vai varificar se retorna a lista de planents',async done=>{

        const retorno = await planet.getAll();

        let arrayRetorno = [];
        if(Array.isArray(arrayRetorno)){
            retorno.forEach(el=>{
                arrayRetorno.push(JSON.parse(JSON.stringify(el)));
            })
        }
        console.log(arrayRetorno);
        expect(arrayRetorno).toEqual(planets.obj);
        
        done();
        
    });


    it('vai varificar a mensagem indicando lista vasia da função getAll', async done=>{

        await planetModel.deleteMany({});

        const retorno = JSON.parse(JSON.stringify(await planet.getAll()));

        console.log(retorno);

        expect(retorno.length).toBe(0);
        expect(retorno).toEqual([]);

        done();

    });

    it('vai varificar o retorno do erro para a função getAll', async done=>{
        virtual_mongodb.disconnect();

        await planet.getAll()
        .catch(received=>{
            expect(received.name).toEqual("MongoError");
            expect(received.message).toEqual("pool is draining, new operations prohibited");
        });
        await virtual_mongodb.connect();

        done();
    
    });

});