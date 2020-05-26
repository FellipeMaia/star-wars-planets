const {planetModel,planet} = require('../../../app/src/models/planet');
const {startConnction,mongoose} = require('../../../app/config/database');

describe("Metodos do moulo Planet",()=>{

    beforeAll(async ()=>{
        await startConnction();
    })

    beforeEach(async ()=>{
        await planetModel.deleteMany({});
    });

    afterAll(async()=>{
        await mongoose.close()
    })

    it('vai verificar se é possivel savar um objeto', ()=>{
        const parms = {
            "nome": "teste",
            "terreno": "teste",
            "clima": "teste"
        }

        planet.save(parms).then(retorno=>{

            expect(retorno.nome).toBe(parms.nome);
            expect(retorno.terreno).toBe(parms.terreno);
            expect(retorno.clima).toBe(parms.clima);
        })

    });

    it('vai verificar se mongoose esta retornando erro quando o campo nome esta vasio', ()=>{
        const parms = {
            "nome": "",
            "terreno": "teste",
            "clima": "teste"
        }

        planet.save(parms).then(retorno=>{
            expect("Não foi possivel salvar o planeta!").toBe(retorno.mansagem);
        });
       
    });

    it('vai verificar se mongoose esta retornando erro quando o campo terreno esta vasio', ()=>{
        const parms = {
            "nome": "teste",
            "terreno": "",
            "clima": "teste"
        }

        planet.save(parms).then(retorno=>{
            expect("Não foi possivel salvar o planeta!").toBe(retorno.mansagem);
        });

    });

    it('vai verificar se mongoose esta retornando erro quando o campo clima esta vasio', ()=>{
        const parms = {
            "nome": "teste",
            "terreno": "teste",
            "clima": ""
        }

        planet.save(parms).then(retorno=>{
            expect("Não foi possivel salvar o planeta!").toBe(retorno.mansagem);
        });

    });

    it('vai verificar se retorna erro quando tenta salvar objetos iguais no banco', ()=>{
        const parms = {
            "nome": "teste",
            "terreno": "teste",
            "clima": "teste"
        }    

        planet.save(parms)
        .then(()=>{
            return planet.save(parms);
        })
        .then(retorno=>{
            expect("O planeta já esta salvo!").toBe(retorno.mansagem);
        });

       
    });
});
