
const JwtStrategy = require('passport-jwt').Strategy;

const ExtractJWT = require('passport-jwt').ExtractJwt;

var config=require('../env_config');
var user_object=require('../../models/user');
const passportCustom = require('passport-custom');
const CustomStrategy = passportCustom.Strategy;
const axios = require('axios');
const env_config = require('../env_config');


module.exports=function(passport){
  // console.log(config.google_client_secret)
    
  passport.use('access_token', new CustomStrategy(
    async function(req, done) {
      // Do your custom user finding logic here, or set to false based on req object
      //make axios call :
      console.log(env_config.AUTH_SERVER)
      axios.post(`${env_config.AUTH_SERVER}:4001/v1/user_authenticate`, {
        access_token: req.body.access_token,
        refresh_token: req.body.refresh_token
      })
      .then(async function (response) {
        //console.log(response);
        if(response.data.success==true){
          let user = await user_object.get_user_by_Oauthid(response.data._id)
          if(!user){
            user = await user_object.create_user({
              user_name:response.data.user_name,
              oauth_id:response.data._id
            });
          }
          done(null, user);
        }
        else
        done(null, false);
        
      })
      .catch(function (error) {
        console.log(error);
      });
      
    }
   ));
    var opts = {}
    opts.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.jwt_secret;

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        user_object.get_user_by_id(jwt_payload._id).then(user=>{
            if(user)
            return done(null,user)
            else
            return done(null,false)
        }).catch(err=>{
            throw err;
        });
    }));

    passport.serializeUser(function(user, done) {
      done(null, user);
    });
    
    passport.deserializeUser(function(user, done) {
      done(null, user);
    });
}

