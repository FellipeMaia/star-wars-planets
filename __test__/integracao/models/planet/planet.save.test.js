const {planetModel,planet} = require('../../../../app/src/models/planet');
const virtual_mongodb = require('../../../_ultil/virtual-mongodb');

let planets;

describe("The save method from module Planet",()=>{

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
        };
        
    });

    afterEach(async ()=>{
        virtual_mongodb.clearDatabase();
    })

    afterAll(async()=>{
        virtual_mongodb.closeDatabase();
    });

    it('should verify if the planet was save to database', async done=>{
        planetModel.findOneAndDelete()
        const parms = {
            "name": "test22",
            "terrain": "test22",
            "climate": "test22"
        }

        planet.save(parms).then(retorno => {

            expect(retorno.mansagem).toBe(undefined);
            expect(retorno.name).toBe(parms.name);
            expect(retorno.terrain).toBe(parms.terrain);
            expect(retorno.climate).toBe(parms.climate);
    
            planets.obj.push(JSON.parse(JSON.stringify(retorno)));
    
            done();

        });



    });

    it('should verify error message when the `name` field is empty', async done=>{
        const parms = {
            "name": "",
            "terrain": "test23",
            "climate": "test23"
        }

        await planet.save(parms)
        .catch(received=>{
            expect(received.name).toBe("ValidationError");
            expect(received.message).toBe("planet validation failed: name: Path `name` is required.");
        });

        done();        
       
    });

    it('should verify error message when the `terrain` field is empty', async done=>{
        const parms = {
            "name": "test24",
            "terrain": "",
            "climate": "test24"
        }

        await planet.save(parms)
        .catch(received=>{
            expect(received.name).toBe("ValidationError");
            expect(received.message).toBe("planet validation failed: terrain: Path `terrain` is required.");
        });

        done();

    });

    it('should verify error message when the `climate` field is empty', async done=>{
        const parms = {
            "name": "test25",
            "terrain": "test25",
            "climate": ""
        }

        await planet.save(parms)
        .catch(received=>{
            expect(received.name).toBe("ValidationError");
            expect(received.message).toBe("planet validation failed: climate: Path `climate` is required.");
        });

        done();

    });

    it('should verify the error message when trying to save the same planet twice', async done=>{
        const parms = {
            name: "test31",
            terrain: "test31",
            climate: "test31"
        }   

        await planet.save(parms)
        .catch(received=>{
            expect(received.name).toBe("Error");
            expect(received.message).toBe("O planeta já foi salvo.");
        });
        
        done();
    });


    it('should verify the error message when trying to save two planet with the same name field', async done=>{
        const parms = {
            name: "test31",
            terrain: "test8888",
            climate: "test777"
        }   

        await planet.save(parms)
        .catch(received=>{
            expect(received.name).toBe("Error");
            expect(received.message).toBe("O planeta já foi salvo.");
        });
        
        done();
    });


    it('should verify if the returns an error message', async done=>{
        const parms = {
            name: "test31",
            terrain: "test8888",
            climate: "test777"
        } 

        virtual_mongodb.disconnect();

        await planet.save(parms).then(()=>{
            done.fail('Estava esperando um erro!');
        })
        .catch(received=>{
            expect(received.name).toEqual("MongoError");
            expect(received.message).toEqual("pool is draining, new operations prohibited");
        });
        
        await virtual_mongodb.connect();
        
        
        done();
    });


});