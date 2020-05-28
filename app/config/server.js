const express = require('express');
const routes = require('../src/routes');
const app = express();

app.use(express.json());
app.use(routes);

require('./database').startConnction();

module.exports.start = function(){
    app.listen(3010,()=>{
        console.log('start server');
    })
}

if(process.env.TEST = 'true')
    module.exports.app = app; 