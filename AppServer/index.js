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
var passport = require('passport');
require('./library/config/config/passport')(passport);
var jwt = require('jsonwebtoken');


app.post('/login_app',passport.authenticate('access_token',{session: false}),(req,res)=>{
  var token = `JWT ${jwt.sign(req.user,config.jwt_secret)}`;
      res.json({
        user:req.user,
        token:token
    });
});

app.post('/test_auth',passport.authenticate('jwt',{session: false}),(req,res)=>{
    return res.json(req.user);
})


app.listen(config.server_port,()=>{
    console.log(`auth server listening to po rt ${config.server_port}`);
});