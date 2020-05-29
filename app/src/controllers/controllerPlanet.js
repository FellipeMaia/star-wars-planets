const {planet} = require('../models/planet');
const APIPlanet = require('./controllerAPIplanet');

module.exports.save = function(req,res){
    const {name,terrain,climate} = req.body;
    const params =  {name:name,terrain:terrain,climate:climate};

    planet.save(params).then(val=>{
        res.json({result:val});  
    }).catch(err=>{
        console.log(err);
        if(err){
            res.type('application/json');
            switch(err.name){
                case 'ValidationError':
                    res.status(405).json({error: 'Campo invalido!\n --> '+err.name+': '+ err.message});
                break;
                default:
                    res.status(500).json({error: 'Não foi possivel salvar o planeta!\n --> '+err.name+': '+ err.message});
                break;
            }
            return;
        }
    });
}


module.exports.getAll = function(req,res){
    const limit = req.header('limit');
    const page = req.header('page');
    planet.getAll(limit,page).then(async val=>{
        res.type('application/json');
        res.set('total-page',val.totalPage);
        if(!Array.isArray(val.planets)){
            return res.json({result:val.planets});
        }
        const results = [];
        for(let i=0;i<val.planets.length;i++){
            const result = JSON.parse(JSON.stringify(val.planets[i]));
            result['films'] = (await APIPlanet.getInformacaoPlanta(result.name)).films;
            results.push(result);
        };
        res.json({result:results});
        
    }).catch(err=>{
        console.log(err);
        if(err){
            res.type('application/json');
            res.status(500).json({error: 'Não foi possivel localizar o planeta!\n --> '+err.name+': '+ err.message});
            return;
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
        result.films = (await APIPlanet.getInformacaoPlanta(result.name)).films;
        res.json({result:result});
    }).catch(err=>{
        console.log(err);
        if(err){
            res.set('Content-Type','application/json')
            res.status(500).json({error: 'Não foi possivel localizar o planeta!\n --> '+err.name+': '+ err.message});
            return;
        }
    });
}

module.exports.getByName = function(req,res){
    const {name} = req.params;
    planet.getByName(name).then(async val=>{
        if(!Array.isArray(val)){
            return res.json({result:val});
        }
        const results = [];
        for(let i=0;i<val.length;i++){
            const result = JSON.parse(JSON.stringify(val[i]));
            result['films'] = (await APIPlanet.getInformacaoPlanta(result.name)).films;
            results.push(result);
        };
        res.json({result:results});    
        
    }).catch(err=>{
        console.log(err);
        if(err){
            res.type('application/json');
            res.status(500).json({error: 'Não foi possivel localizar o planeta!\n --> '+err.name+': '+ err.message});
            return;
        }
    });
}

module.exports.remove = function(req,res){
    const {id} = req.params;
    planet.remove(id).then(val=>{
        res.json({result:val});
    }).catch(err=>{
        console.log(err);
        if(err){
            res.type('application/json');
            res.status(500).json({error: 'Não foi possivel localizar o planeta!\n --> '+err.name+': '+ err.message});
            return;
        }
    });
}
