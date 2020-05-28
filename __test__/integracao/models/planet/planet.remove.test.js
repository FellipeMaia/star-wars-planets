const {planetModel,planet} = require('../../../../app/src/models/planet');
const virtual_mongodb = require('../../../_ultil/virtual-mongodb');

let planets;

describe("Metodo remove do modulo Planet",()=>{

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
            ],
            getAllIds : function(){
                let ids = [];
                planets.obj.forEach(el=>{
                    ids.push(el._id);
                })
                return ids;
            }
        }
    });

    afterEach(async ()=>{
        virtual_mongodb.clearDatabase();
    })

    afterAll(async()=>{
        virtual_mongodb.closeDatabase();
    });


    it('Vai remover um planet do database', async ()=>{
        const expected = planets.obj[0];

        const received = JSON.parse(JSON.stringify(await planet.remove(expected._id)));

        console.log(received);

        expect(received).toEqual(expected);
    });

    it('Vai retornar a mensagem indicando que não achou o planet', async done=>{
        const expected = planets.obj[0];

        const id = expected._id.substring(0,expected._id.length-4)+'7777';
        console.log(id+'\n'+expected._id);

        const received = JSON.parse(JSON.stringify(await planet.remove(id)));

        console.log(received);

        expect(received.mansagem).toEqual('Não há planeta com o nome: '+id);

        done()
    });

    it('Vai retornar a mensagem indicando que ocorreu erro', async done=>{
        const expected = planets.obj[0];

        virtual_mongodb.disconnect();
        try{
            await planet.remove(expected._id);
        }catch(received){
            expect(received.mansagem).toBe("Não foi possivel remove o planeta!");
        }finally{
            await virtual_mongodb.connect();
        }
        
        done();
    });


});
