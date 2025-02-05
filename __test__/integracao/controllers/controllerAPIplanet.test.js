const controllerAPIplanet = require('../../../app/src/controllers/controllerAPIplanet');
const {planetModel} = require('../../../app/src/models/planet');
const virtual_mongodb = require('../../_ultil/virtual-mongodb');

let planets;

describe("Test of API with Star Wars informations",()=>{

    beforeAll(async ()=>{
        virtual_mongodb.connect();
        planets = {
            obj:[
                JSON.parse(JSON.stringify(await(new planetModel({"name": "Tatooine","terrain": "desert","climate": "arid"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"name": "Alderaan","terrain": "grasslands, mountains","climate": "temperate"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"name": "Yavin IV","terrain": "jungle, rainforests","climate": "temperate, tropical"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"name": "Stewjon","terrain": "grass","climate": "temperate"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"name": "terra","terrain": "desert, mountains, jungle, rainforests","climate": "temperate, tropical, arid"})).save())),
            ],
            result:[
                {films:5},// {"name": "Tatooine",films:5},
                {films:2},// {"name": "Alderaan",films:2},
                {films:1},// {"name": "Yavin IV",films:1},
                {films:0},// {"name": "Stewjon",films:0},
                {films:'Without registration!'},// {"name": "terra",films:'Sem registo!'},
            ]
        };
    });

    afterAll(async ()=>{
        virtual_mongodb.closeDatabase();
    });

    it('Should verify return informations of planet search by name', async done=>{
        

        let receiveds = [];
        for(let i=0;i<planets.obj.length;i++){
            receiveds.push(await controllerAPIplanet.getInformacaoPlanta(planets.obj[i].name));
        }

        expect(receiveds).toEqual(planets.result);

        done();
    },10000);

    it('Should verify error message when has return more of one planet', async done=>{
        
        const received = await controllerAPIplanet.getInformacaoPlanta('te');
        
        expect(received.mensagem).toEqual('Retorno com mais de um elemento!');

        done();

    },10000);

});