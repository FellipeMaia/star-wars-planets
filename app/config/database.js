const mongoose = require('mongoose');

//User UserDBStarWars
//passwd 5oS9z4wohZXQaCfF

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
        //return `mongodb://localhost/my_database`
        return `mongodb+srv://${this.USER}:${this.PASSWD}@${this.CLUSTER}.mongodb.net/${this.dataBase}?${this.params.getParams()}`
    }
}

module.exports.startConnction =  async function(){
    await mongoose.connect(prop.getUrl()).then((val)=>{
        console.log('iniciado a conexão');
        //console.log(val);
    }).catch(err=>{
        if(err){
            console.error(err);
            process.exit;
        }
    })
}

module.exports.mongoose = mongoose;