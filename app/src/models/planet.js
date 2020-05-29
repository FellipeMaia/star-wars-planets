const mongoose = require('../../config/database').mongoose;


const planet = new mongoose.Schema({
        nome:{type: String, required : true},
        clima:{type: String, required : true},
        terreno:{type: String, required : true},
    });

const planetModel = mongoose.model("planet",planet);

module.exports.planetModel = planetModel;

function save(params){
    return planetModel.findOne({nome:params.nome}).then(val=>{
        if(val){
            throw new Error('O planeta já esta salvo!');
        }
        return planetModel(params).save()
            .then(retorno=>{
                return retorno;
            });
        });
    
}

function getAll(){
    return planetModel.find({})
        .then(val=>{
            if(!val){
                throw new Error('retorno não definido');
            }
            return val;
        });
}

function getById(id){
    return planetModel.findOne({'_id':id})
        .then(val=>{
            return val;
        });
}

function getByNome(nome){
    return planetModel.find({'nome':nome},'')
        .then(val=>{
            if(!val){
                throw new Error('retorno não definido: resultado: '+val);
            }
            return val;
        });
}

function remove(id){
    return planetModel.findByIdAndDelete(id)
        .then(val=>{
            if(!val){
                throw new Error('Não há planeta com o id: '+id);
            }
            return val;
        });
}

module.exports.planet = {save,getAll,getById,getByNome,remove}
