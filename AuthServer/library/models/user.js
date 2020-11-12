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
                //services:{}
                services:{
                    password:{bcrypt:data.password!=undefined?bcrypt.hashSync(data.password, parseInt(env_config.saltrounds)):""},
                    refresh_token:"",
                    access_token:""
                    //resume:{otp_password_token:data.otp!=undefined?bcrypt.hashSync(data.otp,saltrounds):"",otp_password_expires:data.otp_password_expires!=undefined?data.otp_password_expires:""}
                }
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

    var update_user=async function(data){
        //  old_user.name=data.name!=undefined?data.name:old_user.name;
        var user={
            _id:data._id,
            user_name:data.user_name,
            //password:data.password,
            services:data.services
            // services:{
            //     password:{brcypt:data.password!=undefined?bcrypt.hashSync(data.password, saltRounds):""},
            //     resume:{otp_password_token:data.otp!=undefined?bcrypt.hashSync(data.otp,saltrounds):"",otp_password_expires:data.otp_password_expires!=undefined?data.otp_password_expires:""}
            // }
        }
        var update_response =await new Promise((resolve,reject)=>{
            //var userdb = collection.userdb;
            //var c =collection.vv
            collection.userdb().updateOne({_id:user._id},{$set:user}).then(out=>{
                resolve(user);
            }).catch(err=>{
                reject(err);
            });
        });
        return update_response;
    }

    var get_user_by_username = async function(user_name){
        var user =await new Promise((resolve,reject)=>{
            collection.userdb().findOne({user_name:user_name}).then(out=>{
                resolve(out)

            }).catch(err=>{
                console.log(err)
                reject(err);
            })
        });
        return user;
    };
    var get_user_by_access_token = async function(access_token,refresh_token){
        var user =await new Promise((resolve,reject)=>{
            collection.userdb().findOne({'services.access_token':access_token,'services.refresh_token':refresh_token}).then(out=>{
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
        update_user:function(data){
            return update_user(data);
        },
        get_user_by_username:function(user_name){
            return get_user_by_username(user_name);
        },
        get_user_by_access_token:function(access_token,refresh_token){
            return get_user_by_access_token(access_token,refresh_token);
        }
    }

}();

module.exports=user_model;