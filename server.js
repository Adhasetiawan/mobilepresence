const express = require('express');
const bodyParser = require("body-arser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


var routes = require('./routes');
routes(app);

app.listen(4500, () =>{
    console.log('server started on port');
});