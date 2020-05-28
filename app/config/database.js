const mongoose = require('mongoose');

prop = {
    USER: process.env.USER_SIS,
    PASSWD: process.env.PASSWD,
    CLUSTER: process.env.CLUSTER,
    dataBase: 'star-wars-db',
    params:{
        retryWrites: 'true',
        w: 'majority',
        getParams: function(){
            let par = '';
            Object.keys(this).forEach(el=>{
                if(typeof this[el] !== 'function')
                    par += el+'='+this[el]+'&';
            });
            return par.substr(0,par.length-1);
        }
    },
    //'mongodb+srv://UserDBStarWars:<password>@cluster0-7lt1z.mongodb.net/test?retryWrites=true&w=majority',
    getUrl: function(){
        return `mongodb+srv://${this.USER}:${this.PASSWD}@${this.CLUSTER}.mongodb.net/${this.dataBase}?${this.params.getParams()}`
    }
}

 function initConection(url){

    const mongooseOpts = {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000
    };

    return  mongoose.connect(url,mongooseOpts).then((val)=>{
        console.log(
            `iniciado a conexão\n${val.connections[0].host}:${val.connections[0].port}/${val.connections[0].name}`
        );
    }).catch(err=>{
        if(err){
            console.error(err);
            process.exit;
        }
    })
}

if(process.env.TEST === 'true'){
    /**
     * @param dataBase :defini o database que será gravado, valor obrigatorio!
     */
    module.exports.startConnction =  async function(url){
        if(url){
            //url = `mongodb://localhost:27017/${dataBase}`
            await initConection(url);
        }
    }
}else{
    module.exports.startConnction =  async function(){
        let url = prop.getUrl();
        await initConection(url);
    }
}


module.exports.mongoose = mongoose;