const express = require('express');
const routes = require('../src/routes');
const session = require('express-session');
const UUID4 = require('uuid').v4;
const app = express();

const optionsSession = {
    secret: UUID4(),
    cookie: {
        sessionid:UUID4(),
        domain: '192.168.0.200:80'
    }
}

app.use(session(optionsSession));
app.use(express.json());
app.use(routes);

module.exports.start = function(){
    app.listen(3010,()=>{
        console.log('start server');
    })
}