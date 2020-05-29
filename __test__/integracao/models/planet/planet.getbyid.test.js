const {planetModel,planet} = require('../../../../app/src/models/planet');
const virtual_mongodb = require('../../../_ultil/virtual-mongodb');

let planets;

describe("The getById method from module Planet",()=>{

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


it('should verify the return of the planet filtering by _ID', async done=>{
    console.log(planets);
    const expected = planets.obj[0];

    const received =  JSON.parse(JSON.stringify(await planet.getById(expected._id)));

    expect(received).toEqual(expected);

    done();
});

it('should verify the return of the planet filtering by _ID, when the _ID is invalid', async done=>{
    const expected = planets.obj[0];

    const id = expected._id.substring(0,expected._id.length-4)+'7777';
    console.log(id+'\n'+expected._id)
    expect(id).not.toBe(expected._id);
    const received =  JSON.parse(JSON.stringify(await planet.getById(id)));

    expect(received).toBe(null);

    done();
});

it('should verify the return of the planet filtering by _ID, when returns error', async done=>{
    
    virtual_mongodb.disconnect();

    await planet.getById('5ece6ebf1023932fdd984959')
    .catch(received=>{
        expect(received.name).toEqual("MongoError");
    expect(received.message).toEqual("pool is draining, new operations prohibited");
    });
    
    await virtual_mongodb.connect();
    

    done();
    
});



});