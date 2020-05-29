const axios = require('axios');


module.exports.getInformacaoPlanta = function(name){
    return axios.get('https://swapi.dev/api/planets/?search='+name,{}).then(val=>{
            const results = val.data.results;
            if(!results || results.length === 0){
                return {films: 'Without registration!'}
            }
            if(results.length > 1){
                throw new Error('Retorno com mais de um elemento!');
            }
            return {films: results[0].films.length};
        }).catch(err=>{
            if(err){
                return {
                    mensagem: err.message,
                    erro: err
                }
            }
        })
}
