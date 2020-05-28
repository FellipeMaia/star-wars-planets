const express = require('express');
const routes = require('../src/routes');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('../../swagger.config')
const app = express();

const port = process.env.PORT | 3010;
const host = process.env.HOST || 'localhost';

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerDocument = swaggerJSDoc(swaggerOptions);

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(routes);

require('./database').startConnction();

module.exports.swaggerUi = swaggerUi;
module.exports.start = function(){
    
    app.listen(port,host,()=>{
        console.log('\nstart server API\nDOC API: http://'+host+':'+port+'/api-docs\n');
    })
}
 
if(process.env.TEST = 'true')
    module.exports.app = app; 