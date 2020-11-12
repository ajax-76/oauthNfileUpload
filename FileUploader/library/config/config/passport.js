const FacebookTokenStrategy = require('passport-facebook-token');
//const LocalStrategy = require('passport-local').Strategy;
const   GoogleTokenStrategy  = require('passport-google-token').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;

const ExtractJWT = require('passport-jwt').ExtractJwt;

var config=require('../env_config');
var user_object=require('../../models/user');
const { user_role } = require('../../models/user');


module.exports=function(passport){
  // console.log(config.google_client_secret)
  passport.use('google-token-designer',new GoogleTokenStrategy({
    clientID: config.google_client_id,
    clientSecret: config.google_client_secret
  },
  async function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    //console.log(profile);
    let user= await user_object.find_user_by_googleid(profile._json.id);
         if(user){
          if(user.role==user_role.SHOPPER)
          done(null, false);
          else
          done(null, user);
        }
         else{
           user=await user_object.create_user({
               name:profile._json.name,
               email:profile._json.email,
               phonenumber:"",
               role:user_object.user_role.DESIGNER,
               profile_picture:profile._json.picture,
               google:{
                id:profile._json.id,
                displayname:profile._json.name,
                profile_picture:profile._json.picture,
                access_token:accessToken,
                refresh_token:refreshToken
               }
           });
           done(null,user)
         }
   // return (done,true);
  }
));


  passport.use('google-token-shopper',new GoogleTokenStrategy({
    clientID: config.google_client_id,
    clientSecret: config.google_client_secret
  },
  async function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    //console.log(profile);
    let user= await user_object.find_user_by_googleid(profile._json.id);
         if(user){
          if(user.role==user_role.DESIGNER)
          done(null, false);
          else
          done(null, user);
        }
         else{
           user=await user_object.create_user({
               name:profile._json.name,
               email:profile._json.email,
               phonenumber:"",
               role:user_object.user_role.SHOPPER,
               profile_picture:profile._json.picture,
               google:{
                id:profile._json.id,
                displayname:profile._json.name,
                profile_picture:profile._json.picture,
                access_token:accessToken,
                refresh_token:refreshToken
               }
           });
           done(null,user)
         }
   // return (done,true);
  }
));
    passport.use('facebook-token-shopper',new FacebookTokenStrategy({
        clientID: config.facebook_client_id,
        clientSecret: config.facebook_clientSecret,
        //callbackURL: config.facebook_callbackURL,
        profileFields: ['id', 'displayName', 'photos', 'email','name','gender','profileUrl']
      },
      async function(accessToken, refreshToken, profile, done) {
         //console.log(profile._json.picture)
         //--- create or find user ---
         // find user by email 
         //console.log(profile)
         let user= await user_object.find_user_by_facebookid(profile._json.id);
         if(user){
          if(user.role==user_role.DESIGNER)
          done(null, false);
          else
          done(null, user);
        }
         else{
           user=await user_object.create_user({
               name:profile._json.name,
               email:profile._json.email,
               phonenumber:"",
               role:user_object.user_role.SHOPPER,
               profile_picture:profile.photos,
               facebook:{
                _id:profile._json.id,
                displayname:profile._json.name,
                picture:profile._json.picture,
                access_token:accessToken,
                refresh_token:refreshToken
               }
           });
           done(null,user)
         }
      }
    ));
    
    passport.use('facebook-token-designer',new FacebookTokenStrategy({
        clientID: config.facebook_client_id,
        clientSecret: config.facebook_clientSecret,
        //callbackURL: config.facebook_callbackURL,
        profileFields: ['id', 'displayName', 'photos', 'email','name','gender','profileUrl']
      },
      async function(accessToken, refreshToken, profile, done) {
         
         //--- create or find user ---
         // find user by email 
         //console.log(profile)
         let user= await user_object.find_user_by_facebookid(profile._json.id);
         
         if(user){
           if(user.role==user_role.SHOPPER)
           done(null, false);
           else
           done(null, user);
         }
         
         else{
           user=await user_object.create_user({
               name:profile._json.name,
               email:profile._json.email,
               phonenumber:"",
               role:user_object.user_role.DESIGNER,
               profile_picture:profile.photos,
               facebook:{
                _id:profile._json.id,
                displayname:profile._json.name,
                picture:profile._json.picture,
                access_token:accessToken,
                refresh_token:refreshToken
               }
           });
           done(null,user)
         }
      }
    ));

    var opts = {}
    opts.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.jwt_secret;

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        user_object.find_user_by_id(jwt_payload._id).then(user=>{
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

