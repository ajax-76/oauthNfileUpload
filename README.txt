# Example for config file separation is writen in the code itself using different dockerfile for production and development environment -- 
1. providing examples for it : 

config.js file: -- 
module.exports=process.env.NODE_ENV=='production'?prodobj:devobj

dev config object -> devobj={
    connectionstring:process.env.MONGO_URL_DEV,
    database:process.env.MONGO_DATABASE_DEV,
};

prod config object -> prodobj={
    connectionstring:process.env.MONGO_URL_PROD,
    database:process.debug.env.MONGO_DATABASE_PROD,
};

in package.json -> file "start":cross-env NODE_ENV=production  node index.js

# Example for Callback to Promise: Already been added to the project

1. A Callback function 

const compare_password =function (myPassword, hash, cb) {
     bcrypt.compare(myPassword, hash, function (err, IsMatch) {
        if (err) throw err;
        cb(null, IsMatch)
    });
};

const res =new Promise((resolve,reject)=>{
    compare_password(data.password,user.services.password.bcrypt,function(err, isMatch){
        if (err) throw err;
        if(isMatch){
            // create access_ token and refresh token
            const access_token = uuidv1();
            const refresh_token =uuidv1();
            user.services.refresh_token= refresh_token;
            user.services.access_token = access_token;
            // save data 
            console.log(access_token,refresh_token)
            user_model.update_user(user).then(save_data=>{
            resolve({
                success:true,
                message:"login successfull",
                access_token:access_token,
                refresh_token:refresh_token
            })
            });
        }
        else{
            resolve({
                success:false,
                message:"password mismatch"
            })
        }
        })
})
