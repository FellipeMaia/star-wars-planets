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
        if(!val){
            return planetModel(params).save()
            .then(retorno=>{
                return retorno;
            });
        }else{
            return {
                mansagem: "O planeta já esta salvo!"
            }
        }
    })
    .catch(err=>{
        if(err){
            return {
                mansagem: "Não foi possivel salvar o planeta!",
                erro: err
            }
        }
    });
    
}

function getAll(){
    return planetModel.find({})
        .then(val=>{
            if(!!val && val.length>0){
                return val;
            }else{
                return {mansagem:'Não há planeta!'};
            }
        }).catch(err=>{
            if(err){
                return {
                    mansagem: "Não foi possivel recuperar os planetas!",
                    erro: err
                };
            }
        })
}

function getById(id){
    return planetModel.findOne({'_id':id})
        .then(val=>{
            if(!val){
                return {mansagem:'Não há planeta com o _id: '+id};
            }
            return val;
        }).catch(err=>{
            if(err){
                return {
                    mansagem: "Não foi possivel recuperar o planeta!",
                    erro: err
                };
            }
        });;
}

function getByNome(nome){
    return planetModel.find({'nome':nome},'')
        .then(val=>{
            if(!val || val.length === 0){
                return {mansagem:'Não há planeta com o nome: '+nome};
            }
            return val;
        }).catch(err=>{
            if(err){
                return {
                    mansagem: "Não foi possivel recuperar o planeta!",
                    erro: err
                };
            }
        });;
}

function remove(id){
    return planetModel.findByIdAndDelete(id)
        .then(val=>{
            if(!val || val.length === 0){
                return {mansagem:'Não há planeta com o nome: '+id};
            }
            return val;
        }).catch(err=>{
            if(err){
                return {
                    mansagem: "Não foi possivel remove o planeta!",
                    erro: err
                };
            }
        });;
}

module.exports.planet = {save,getAll,getById,getByNome,remove}
