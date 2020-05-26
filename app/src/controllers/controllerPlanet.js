const {planet} = require('../models/planet');

module.exports.post = function(req,res){
    const {nome,terreno,clima} = req.body;
    const params =  {nome:nome,terreno:terreno,clima:clima};

    planet.save(params).then(val=>{
        //console.log(val);
        res.json(val);  
    });
}

//isso é para verificar so uma ENV consegue mudar o comportamento do sistema
function validarNome(nome){
    return !!nome
}

if(process.env.TEST){
    module.exports.teste = {validarNome};
}