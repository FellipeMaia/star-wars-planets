const {planet} = require('../models/planet');
const APIPlanet = require('./controllerAPIplanet');

module.exports.save = function(req,res){
    const {nome,terreno,clima} = req.body;
    const params =  {nome:nome,terreno:terreno,clima:clima};

    planet.save(params).then(val=>{
        res.json({result:val});  
    }).catch(e=>{
        if(e){
            res.type('application/json');
            switch(e.name){
                case 'ValidationError':
                    res.status(400).json({error: 'Campo invalido!\n --> '+e.name+': '+ e.message});
                break;
                default:
                    res.status(500).json({error: 'Não foi possivel salvar o planeta!\n --> '+e.name+': '+ e.message});
                break;
            }
        }
    });
}


module.exports.getAll = function(req,res){
    planet.getAll().then(async val=>{
        if(!Array.isArray(val)){
            return res.json({result:val});
        }
        const results = [];
        for(let i=0;i<val.length;i++){
            const result = JSON.parse(JSON.stringify(val[i]));
            result['films'] = (await APIPlanet.getInformacaoPlanta(result.nome)).films;
            results.push(result);
        };
        res.json({result:results});
        
    }).catch(err=>{
        if(err){
            res.type('application/json');
            res.status(500).json({error: 'Não foi possivel localizar o planeta!\n --> '+err.name+': '+ err.message});
        }
    })
}

module.exports.getById = function(req,res){
    const {id} = req.params;
    planet.getById(id).then(async val=>{
        console.log(val);
        if(!val){
            return res.json({result:val});
        }
        const result = JSON.parse(JSON.stringify(val));
        result.films = (await APIPlanet.getInformacaoPlanta(result.nome)).films;
        res.json({result:result});
    }).catch(err=>{
        console.log(err);
        if(err){
            res.set('Content-Type','application/json')
            .status(500)
            .json({error: 'Não foi possivel localizar o planeta!\n --> '+err.name+': '+ err.message});
        }
    });
}

module.exports.getByNome = function(req,res){
    const {nome} = req.params;
    planet.getByNome(nome).then(async val=>{
        if(!Array.isArray(val)){
            return res.json({result:val});
        }
        const results = [];
        for(let i=0;i<val.length;i++){
            const result = JSON.parse(JSON.stringify(val[i]));
            result['films'] = (await APIPlanet.getInformacaoPlanta(result.nome)).films;
            results.push(result);
        };
        res.json({result:results});    
        
    }).catch(err=>{
        if(err){
            res.type('application/json');
            res.status(500).json({error: 'Não foi possivel localizar o planeta!\n --> '+err.name+': '+ err.message});
        }
    });
}

module.exports.remove = function(req,res){
    const {id} = req.params;
    planet.remove(id).then(val=>{
        res.json({result:val});
    }).catch(err=>{
        if(err){
            res.type('application/json');
            res.status(500).json({error: 'Não foi possivel localizar o planeta!\n --> '+err.name+': '+ err.message});
        }
    });
}
