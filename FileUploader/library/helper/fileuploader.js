const AWS = require('aws-sdk');
const env_config = require('../config/env_config');
AWS.config.update({
    accessKeyId: env_config.space_access_id,
    secretAccessKey: env_config.space_secret_key
});
var spacesEndpoint = new AWS.Endpoint('sfo2.digitaloceanspaces.com');
var s3 = new AWS.S3({endpoint: spacesEndpoint});
var puttos3object = function(){
    var puts3=async function(data){
        var params = {Bucket: env_config.bucket_name, Key:data.path, Body: data.data,ACL:"public-read"};
        var res  = await new Promise(function(resolve,reject){
            s3.putObject(params, function(err, data) {
                if (err) {
                  console.log(err);
                  resolve(err)
                } else {
                  var msg ="file saved to spaces";
                  console.log(msg);
                  resolve(msg);
                  //resolve(promiseforupload(exitno,imagelist,userid,bucketName));     
                }
              });
        });

        return res;
        
    };
    return {
        put:function(data){
            return puts3(data);
        }
    }
}();

module.exports = puttos3object;