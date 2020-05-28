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
        }).catch(err=>{
        if(err){
            switch(err.name){
                case 'MongoError':
                    const error = new Error('Não foi possivel salvar o planeta!\n --> '+err.name+': '+ err.message);
                    throw error;
                case 'ValidationError':
                    throw new Error('Campo(s) invalido!\n --> '+err.name+': '+ err.message);
                default:
                    console.log(err);
                    throw err;
            }
        }
    });
    
}

function getAll(){
    return planetModel.find({})
        .then(val=>{
            if(!val){
                throw new Error('retorno não definido');
            }
            return val;
        }).catch(err=>{
            if(err){
                switch(err.name){
                    case 'MongoError':
                        const error = new Error('Não foi possivel localizar o planeta!\n --> '+err.name+': '+ err.message);
                        throw error;
                    default:
                        console.log(err);
                        throw err;
                }
            }
        })
}

function getById(id){
    return planetModel.findOne({'_id':id})
        .then(val=>{
            return val;
        }).catch(err=>{
            if(err){
                switch(err.name){
                    case 'MongoError':
                        const error = new Error('Não foi possivel localizar o planeta!\n --> '+err.name+': '+ err.message);
                        throw error;
                    default:
                        console.log(err);
                        throw err;
                }
            }
        });;
}

function getByNome(nome){
    return planetModel.find({'nome':nome},'')
        .then(val=>{
            if(!val){
                throw new Error('retorno não definido');
            }
            return val;
        }).catch(err=>{
            if(err){
                switch(err.name){
                    case 'MongoError':
                        const error = new Error('Não foi possivel localizar o planeta!\n --> '+err.name+': '+ err.message);
                        throw error;
                    default:
                        console.log(err);
                        throw err;
                }
            }
        });;
}

function remove(id){
    return planetModel.findByIdAndDelete(id)
        .then(val=>{
            if(!val){
                throw new Error('retorno não definido');
            }
            return val;
        }).catch(err=>{
            if(err){
                switch(err.name){
                    case 'MongoError':
                        const error = new Error('Não foi possivel remover o planeta!\n --> '+err.name+': '+ err.message);
                        throw error;
                    default:
                        console.log(err);
                        throw err;
                }
            }
        });;
}

module.exports.planet = {save,getAll,getById,getByNome,remove}
