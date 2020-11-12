var collection = require('../config/config/database');
var model=function(){

    var get_type_size = async function(type,size){
        var user =await new Promise((resolve,reject)=>{
            console.log(size,typeof size)
            collection.dummy_db().find({type:type}).limit(size).toArray().then(out=>{
                resolve(out.map(m=>{
                    return {
                        type:m.type,d1:m.d1,d2:m.d2,d3:m.d3
                    }
                }))
            }).catch(err=>{
                reject(err);
            })
        });
        return user;
    };
    

    return{
        get_type_size:function(type,size) {
            return  get_type_size(type,size);            
        }
    }

}();

module.exports=model;