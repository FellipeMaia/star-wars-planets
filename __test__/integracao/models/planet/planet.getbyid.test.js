const {planetModel,planet} = require('../../../../app/src/models/planet');
const virtual_mongodb = require('../../../_ultil/virtual-mongodb');

let planets;

describe("Metodo getById do moulo Planet",()=>{

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


it('vai verificar o retorno de planet filtando por _ID', async done=>{
    console.log(planets);
    const expected = planets.obj[0];

    const received =  JSON.parse(JSON.stringify(await planet.getById(expected._id)));

    expect(received).toEqual(expected);

    done();
});

it('vai verificar o retorno de planet filtando por _ID quando esta vazio', async done=>{
    const expected = planets.obj[0];

    const id = expected._id.substring(0,expected._id.length-4)+'7777';
    console.log(id+'\n'+expected._id)
    expect(id).not.toBe(expected._id);
    const received =  JSON.parse(JSON.stringify(await planet.getById(id)));

    expect(received.mansagem).toBe("Não há planeta com o _id: "+id);

    done();
});

it('vai verificar o retorno de planet filtando por _ID quando esta retornando erro', async done=>{
    
    virtual_mongodb.disconnect();
    try{
        await planet.getById('5ece6ebf1023932fdd984959');
    }catch(received){
        expect(received.mansagem).toEqual("Não foi possivel recuperar o planeta!");
    }finally{
        await virtual_mongodb.connect();
    }

    done();
    
});



});