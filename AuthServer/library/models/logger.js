const uuidv1 = require('uuid').v1;
const bcrypt = require('bcrypt');
var collection = require('../config/config/database');
var env_config=require('../config/env_config');
var model=function(){
    var logger=async function(data){
        try{
            var logobject={
                _id:uuidv1(),
                reqobject:data,
                timestamp:new Date()
                
            }
            //console.log(user,"create2")
            var create_response =await new Promise((resolve,reject)=>{
                //var userdb = collection.userdb;
                //var c =collection.vv
                collection.request_logger().insertOne(logobject).then(out=>{
                    resolve(logobject);
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

    

    return{
        logger:function(data) {
            return  logger(data);            
        }
    }

}();

module.exports=model;