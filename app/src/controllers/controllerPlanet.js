const {planet} = require('../models/planet');
const APIPlanet = require('./controllerAPIplanet');

module.exports.post = function(req,res){
    const {nome,terreno,clima} = req.body;
    const params =  {nome:nome,terreno:terreno,clima:clima};

    planet.save(params).then(val=>{
        res.json(val);  
    });
}


module.exports.getAll = function(req,res){
    planet.getAll().then(async val=>{
        if(Array.isArray(val)){
            const results = [];
            for(let i=0;i<val.length;i++){
                const result = JSON.parse(JSON.stringify(val[i]));
                result['films'] = (await APIPlanet.getInformacaoPlanta(result.nome)).films;
                results.push(result);
            };
            res.json(results);
        }else{
            res.json(val);
        }
        
    })
}

module.exports.getById = function(req,res){
    const {id} = req.params;
    planet.getById(id).then(async val=>{
        if(val){
            res.json(val);
        }
        const result = JSON.parse(JSON.stringify(val));
        result.films = (await APIPlanet.getInformacaoPlanta(result.nome)).films;
        res.json(result);
    })
}

module.exports.getByNome = function(req,res){
    const {nome} = req.params;
    planet.getByNome(nome).then(async val=>{
        if(Array.isArray(val)){
            const results = [];
            for(let i=0;i<val.length;i++){
                const result = JSON.parse(JSON.stringify(val[i]));
                result['films'] = (await APIPlanet.getInformacaoPlanta(result.nome)).films;
                results.push(result);
            };
            res.json(results);
        }else{
            res.json(val);
        }
    })
}

module.exports.remove = function(req,res){
    const {id} = req.params;
    planet.remove(id).then(val=>{
        res.json(val);
    })
}
