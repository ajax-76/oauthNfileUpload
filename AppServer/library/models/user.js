const uuidv1 = require('uuid').v1;
const bcrypt = require('bcrypt');
var collection = require('../config/config/database');
var env_config=require('../config/env_config');
var user_model=function(){
    var create_user=async function(data){
        try{
            var user={
                _id:uuidv1(),
                user_name:data.user_name!=undefined?data.user_name:"",
                oauth_id:data.oauth_id
                //services:{}
                
            }
            //console.log(user,"create2")
            var create_response =await new Promise((resolve,reject)=>{
                //var userdb = collection.userdb;
                //var c =collection.vv
                collection.userdb().insertOne(user).then(out=>{
                    resolve(user);
                }).catch(err=>{
                    reject(err);
                });
            });
            return create_response;
        }
        catch(err){
            // console.log("error",err);
            throw err;
        };
        
    }

    
    var get_user_by_Oauthid = async function(oauth_id){
        var user =await new Promise((resolve,reject)=>{
            collection.userdb().findOne({oauth_id:oauth_id}).then(out=>{
                resolve(out)
            }).catch(err=>{
                reject(err);
            })
        });
        return user;
    };
    
    var get_user_by_id = async function(_id){
        var user =await new Promise((resolve,reject)=>{
            collection.userdb().findOne({_id:_id}).then(out=>{
                resolve(out)
            }).catch(err=>{
                reject(err);
            })
        });
        return user;
    };
    return{
        create_user:function(data) {
            return  create_user(data);            
        },
        get_user_by_Oauthid:function(oauth_id){
            return get_user_by_Oauthid(oauth_id);
        },
        get_user_by_id:function(_id){
            return get_user_by_id(_id);
        }
    }

}();

module.exports=user_model;