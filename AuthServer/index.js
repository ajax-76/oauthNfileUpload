require('dotenv').config();
const express =require('express');
const app =express();
const cors =require('cors');
const morgan = require('morgan');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(morgan('dev')); // support encoded bodies
app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(urlencodedParser);
const config = require('./library/config/env_config');
require('./web/routes')(app);

app.listen(config.server_port,()=>{
    console.log(`auth server listening to po rt ${config.server_port}`);
});