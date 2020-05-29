const mongoose = require('../../config/database').mongoose;


const planet = new mongoose.Schema({
        name:{type: String, required : true},
        climate:{type: String, required : true},
        terrain:{type: String, required : true},
    });

const planetModel = mongoose.model("planet",planet);

module.exports.planetModel = planetModel;

function save(params){
    return planetModel.findOne({name:params.name}).then(val=>{
        if(val){
            throw new Error('O planeta já foi salvo.');
        }
        return planetModel(params).save()
            .then(retorno=>{
                return retorno;
            });
        });
    
}

function getAll(limit = 10, page = 1){
    limit = (limit>100?100:limit);
    let cont;
    return planetModel.find().count().then(val=>{
                cont = val;
                return planetModel.find().skip((page - 1) * limit).limit(limit)
            }).then(result=>{
                return {
                            planets: result,
                            totalPage: Math.ceil(cont/limit)
                        }
            })
            .then(val=>{
                if(!val.planets){
                    throw new Error('Retorno não definido');
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

function getByName(name){
    return planetModel.find({'name':name},'')
        .then(val=>{
            if(!val){
                throw new Error('Retorno não definido');
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

module.exports.planet = {save,getAll,getById,getByName,remove}
