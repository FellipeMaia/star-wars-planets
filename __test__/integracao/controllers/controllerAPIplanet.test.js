const controllerAPIplanet = require('../../../app/src/controllers/controllerAPIplanet');
const {planetModel} = require('../../../app/src/models/planet');
const virtual_mongodb = require('../../_ultil/virtual-mongodb');

let planets;

describe("Teste da API com as informações de Star Wars",()=>{

    beforeAll(async ()=>{
        virtual_mongodb.connect();
        planets = {
            obj:[
                JSON.parse(JSON.stringify(await(new planetModel({"nome": "Tatooine","terreno": "desert","clima": "arid"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"nome": "Alderaan","terreno": "grasslands, mountains","clima": "temperate"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"nome": "Yavin IV","terreno": "jungle, rainforests","clima": "temperate, tropical"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"nome": "Stewjon","terreno": "grass","clima": "temperate"})).save())),
                JSON.parse(JSON.stringify(await(new planetModel({"nome": "terra","terreno": "desert, mountains, jungle, rainforests","clima": "temperate, tropical, arid"})).save())),
            ],
            result:[
                {films:5},// {"nome": "Tatooine",films:5},
                {films:2},// {"nome": "Alderaan",films:2},
                {films:1},// {"nome": "Yavin IV",films:1},
                {films:0},// {"nome": "Stewjon",films:0},
                {films:'Sem registo!'},// {"nome": "terra",films:'Sem registo!'},
            ]
        };
    });

    afterAll(async ()=>{
        virtual_mongodb.closeDatabase();
    });

    it('Busca as informações do planeta utilizando o nome', async done=>{
        

        let receiveds = [];
        for(let i=0;i<planets.obj.length;i++){
            receiveds.push(await controllerAPIplanet.getInformacaoPlanta(planets.obj[i].nome));
        }

        expect(receiveds).toEqual(planets.result);

        done();
    });

    it('Retorna erro pois teve mais 1 retorno da API', async done=>{
        
        const received = await controllerAPIplanet.getInformacaoPlanta('te');
        
        expect(received.mensagem).toEqual('Retorno com mais de um elemento!');

        done();

    });

});