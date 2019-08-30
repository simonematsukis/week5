let express = require('express');
let app = express();
let url = require('url');


let router = require('./Lab3Router.js');


//both router.js and server.js should be in same directory
app.use('/', router);

app.listen(8080);


