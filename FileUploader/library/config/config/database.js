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
        dummy_db:function(){
           return dbo.collection("DUMMY_COLLECTION");
        }
    }
}();

module.exports=get_db_collection;