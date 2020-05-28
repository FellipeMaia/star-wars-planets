const {planetModel,planet} = require('../../../../app/src/models/planet');
const virtual_mongodb = require('../../../_ultil/virtual-mongodb');

let planets;

describe("Metodo save do modulo Planet",()=>{

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
        };
        
    });

    afterEach(async ()=>{
        virtual_mongodb.clearDatabase();
    })

    afterAll(async()=>{
        virtual_mongodb.closeDatabase();
    });

    it('vai verificar se é possivel savar um objeto', async done=>{
        planetModel.findOneAndDelete()
        const parms = {
            "nome": "teste22",
            "terreno": "teste22",
            "clima": "teste22"
        }

        const retorno = JSON.parse(JSON.stringify(await planet.save(parms)));


        expect(retorno.mansagem).toBe(undefined);
        expect(retorno.nome).toBe(parms.nome);
        expect(retorno.terreno).toBe(parms.terreno);
        expect(retorno.clima).toBe(parms.clima);

        planets.obj.push(JSON.parse(JSON.stringify(retorno)));

        done();

    });

    it('vai verificar se mongoose esta retornando erro quando o campo nome esta vasio', async done=>{
        const parms = {
            "nome": "",
            "terreno": "teste23",
            "clima": "teste23"
        }

        try{
            await planet.save(parms);
        }catch(received){
            expect(received.message).toBe("Campo(s) invalido!\n --> ValidationError: planet validation failed: nome: Path `nome` is required.");
        }

        done();        
       
    });

    it('vai verificar se mongoose esta retornando erro quando o campo terreno esta vasio', async done=>{
        const parms = {
            "nome": "teste24",
            "terreno": "",
            "clima": "teste24"
        }

        try{
            await planet.save(parms);
        }catch(received){
            expect(received.message).toBe("Campo(s) invalido!\n --> ValidationError: planet validation failed: terreno: Path `terreno` is required.");
        }

        done();

    });

    it('vai verificar se mongoose esta retornando erro quando o campo clima esta vasio', async done=>{
        const parms = {
            "nome": "teste25",
            "terreno": "teste25",
            "clima": ""
        }

        try{
            await planet.save(parms);
        }catch(received){
            expect(received.message).toBe("Campo(s) invalido!\n --> ValidationError: planet validation failed: clima: Path `clima` is required.");
        }

        done();

    });

    it('vai verificar se retorna erro quando tenta salvar objetos iguais no banco', async done=>{
        const parms = {
            nome: "teste31",
            terreno: "teste31",
            clima: "teste31"
        }   

        try{
            await planet.save(parms);
        }catch(received){
            expect(received.message).toBe("O planeta já esta salvo!");
        }
        
        done();
    });


    it('vai verificar se retorna erro quando tenta salvar objetos somente os nomes iguais no banco', async done=>{
        const parms = {
            nome: "teste31",
            terreno: "teste8888",
            clima: "teste777"
        }   

        try{
            await planet.save(parms);
        }catch(received){
            expect(received.message).toBe("O planeta já esta salvo!");
        }
        
        done();
    });


    it('Vai retornar a mensagem indicando que ocorreu erro', async done=>{
        const parms = {
            nome: "teste31",
            terreno: "teste8888",
            clima: "teste777"
        } 

        virtual_mongodb.disconnect();
        try{
            await planet.save(parms);
        }catch(received){
            expect(received.message).toBe("Não foi possivel salvar o planeta!\n --> MongoError: pool is draining, new operations prohibited");
        }finally{
            await virtual_mongodb.connect();
        }
        
        done();
    });


});