const mongoose = require('../../config/database').mongoose;


const planet = new mongoose.Schema({
        nome:{type: String, required : true},
        clima:{type: String, required : true},
        terreno:{type: String, required : true},
    });

const planetModel = mongoose.model("planet",planet);

module.exports.planetModel = planetModel;

function save(params){
    return planetModel.findOne(params).then(val=>{
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
            console.error(err);
            return {
                mansagem: "Não foi possivel salvar o planeta!",
                erro: err
            }
        }
    });
    
}
module.exports.planet = {save}
