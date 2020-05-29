const {planetModel,planet} = require('../../../../app/src/models/planet');
const virtual_mongodb = require('../../../_ultil/virtual-mongodb');

let planets;

describe("The remove method from module Planet",()=>{

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
            ]
        }
    });

    afterEach(async ()=>{
        virtual_mongodb.clearDatabase();
    })

    afterAll(async()=>{
        virtual_mongodb.closeDatabase();
    });


    it('should verify if the planet was removed from database', async done=>{
        const expected = planets.obj[0];

        planet.remove(expected._id)
        .then(received=>{

            expect(received.name).toBe(expected.name);
            expect(received.terrain).toBe(expected.terrain);
            expect(received.climate).toBe(expected.climate);
            expect(received.id).toBe(expected._id);

            done();
        });


    });

    it('should verify the error message when the _ID is not found', async done=>{
        const expected = planets.obj[0];

        const id = expected._id.substring(0,expected._id.length-4)+'7777';
        //console.log(id+'\n'+expected._id);

        
        await planet.remove(id).then(()=>{
            done.fail('Não ocorreu o erro!');
        }).catch(received=>{

            expect(received.name).toBe('Error');
            expect(received.message).toBe('Não há planeta com o id: '+id);

            done();
        })

        
    });

    it('should verify if the returns an error message', async done=>{
        const expected = planets.obj[0];

        virtual_mongodb.disconnect();
        
        planet.remove(expected._id).then(()=>{
            done.fail('Não ocorreu o erro!');
        })
        .catch(received=>{
            expect(received.name).toEqual("MongoError");
            expect(received.message).toEqual("pool is draining, new operations prohibited");
        });

        await virtual_mongodb.connect();
        
        
        done();
    });


});
