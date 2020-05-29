const {planetModel,planet} = require('../../../../app/src/models/planet');
const virtual_mongodb = require('../../../_ultil/virtual-mongodb');

let planets;

describe("The getByName method from module Planet",()=>{

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


    it('should verify the return of the planet filtering by name', done=>{
        const expected = planets.obj[0];

        planet.getByName(expected.name).then(received=>{

            expect(received.length).toBe(1);
            expect(received[0].name).toBe(expected.name);
            expect(received[0].terrain).toBe(expected.terrain);
            expect(received[0].climate).toBe(expected.climate);
            expect(received[0].id).toBe(expected._id);

            done();
    
        })
    });

    it('should verify if the return is a empty list, when the name is not found', done=>{
       
        planet.getByName('teste-not-have').then(received=>{

            expect(received.length).toBe(0);
            expect(received).toEqual([]);
    
            done();
    
        })
    });

    it('should verify if the returns an error message', async done=>{
        
        virtual_mongodb.disconnect();

        planet.getByName('teste999')
        .catch(received=>{
            expect(received.name).toEqual("MongoError");
            expect(received.message).toEqual("pool is draining, new operations prohibited");
        });

        await virtual_mongodb.connect();
        
        done();
    });



});