const {planet} = require('../models/planet');

module.exports.post = function(req,res){
    const {nome,terreno,clima} = req.body;
    const params =  {nome:nome,terreno:terreno,clima:clima};

    planet.save(params).then(val=>{
        res.json(val);  
    });
}


module.exports.getAll = function(req,res){
    planet.getAll().then(val=>{
        res.json(val);
    })
}

module.exports.getById = function(req,res){
    const {id} = req.params;
    planet.getById(id).then(val=>{
        res.json(val);
    })
}

module.exports.getByNome = function(req,res){
    const {nome} = req.params;
    planet.getByNome(nome).then(val=>{
        res.json(val);
    })
}

module.exports.remove = function(req,res){
    const {id} = req.params;
    planet.remove(id).then(val=>{
        res.json(val);
    })
}
