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

        expect(retorno.mansagem).toBe('Não há planeta!');

        done();

    });

    it('vai varificar o retorno do erro para a função getAll', async done=>{
        virtual_mongodb.disconnect();
        try{
            const retorno = await planet.getAll();
        }catch(err){
            expect(err.mansagem).toBe('Não foi possivel recuperar os planetas!');
        }finally{
            await virtual_mongodb.connect();
        }

        done();
    
    });

});