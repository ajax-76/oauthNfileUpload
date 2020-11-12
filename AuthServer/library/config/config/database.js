var MongoClient = require("mongodb").MongoClient;
var connectionstring=require('../env_config').connectionstring;
var database=require('../env_config').database;
var get_db_collection =function(){
    var dbo={};
    MongoClient.connect(connectionstring,{ useUnifiedTopology: true },function(err,db){
        if (err) throw err;
        dbo =db.db(database);
    });

    return {
        userdb:function(){
           return dbo.collection("OAUTH_USER");
        }
    }
}();

module.exports=get_db_collection;