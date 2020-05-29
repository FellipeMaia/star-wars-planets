const {planetModel,planet} = require('../../../../app/src/models/planet');
const virtual_mongodb = require('../../../_ultil/virtual-mongodb');

let planets;

describe("The getAll method from module Planet",()=>{

    beforeAll(async ()=>{
        await virtual_mongodb.connect();
    })

    beforeEach(async ()=>{
        planets = {
            obj:[
                JSON.parse(JSON.stringify(await(new planetModel({"name": "test31","terrain": "test31","climate": "test31"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"name": "test32","terrain": "test32","climate": "test32"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"name": "test33","terrain": "test33","climate": "test33"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"name": "test34","terrain": "test34","climate": "test34"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"name": "test42","terrain": "test42","climate": "test42"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"name": "test43","terrain": "test43","climate": "test43"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"name": "test44","terrain": "test44","climate": "test44"})).save())),
            ]
        }
    });

    afterEach(async ()=>{
        virtual_mongodb.clearDatabase();
    })

    afterAll(async()=>{
        virtual_mongodb.closeDatabase();
    });


    it('should verify the return of the planet list',done=>{

        planet.getAll().then(retorno=>{

            let arrayRetorno = [];
            if(Array.isArray(retorno.planets)){
                retorno.planets.forEach(el=>{
                    arrayRetorno.push(JSON.parse(JSON.stringify(el)));
                })
            }
            //console.log(arrayRetorno);
            expect(retorno.totalPage).toEqual(1);
            expect(arrayRetorno).toEqual(planets.obj);
            
            done();
        });

    });

    it('should verify the return of the planet list setting limit = 2 and page = 3',done=>{
        const expected = [
            planets.obj[4],
            planets.obj[5]
        ]   

        planet.getAll(2,3).then(retorno=>{
            //console.log(retorno);

            let arrayRetorno = [];
            if(Array.isArray(retorno.planets)){
                retorno.planets.forEach(el=>{
                    arrayRetorno.push(JSON.parse(JSON.stringify(el)));
                })
            }
            //console.log(arrayRetorno);
            expect(arrayRetorno.length).toEqual(2);
            expect(retorno.totalPage).toEqual(4);
            expect(arrayRetorno).toEqual(expected);
            
            done();
        });

    });



    it('should verify the if the list is empty', async done=>{

        planetModel.deleteMany({})
        .then(()=>{
            return planet.getAll();
        }).then(retorno=>{

            expect(retorno.totalPage).toBe(0);
            expect(retorno.planets.length).toBe(0);
            expect(retorno.planets).toEqual([]);

            done();

        })

    });

    it('should verify if the returns an error message', async done=>{
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