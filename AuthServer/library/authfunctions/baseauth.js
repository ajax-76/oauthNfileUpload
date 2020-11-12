// 1. create user  .. 
// 2. login user   ...
// 3. Authenticate access_token , refresh_token . . . 
// 4. Grant new refresh token .. 
const uuidv1 = require('uuid').v1;
const bcrypt = require('bcrypt');

var authfunctions = function (user_model) {
    this.create_users = async function(data) {
        await user_model.create_user({
            user_name:data.user_name,
            password:data.password
        });

    };

    this.login_user = async function(data) {
         const user = await user_model.get_user_by_username(data.user_name);
         if (!user){
             return {
                 success:false,
                 message:"user not found"
             }
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
        return res;
    }


    this.authenticate_user = async function(data) {
        const access_token = data.access_token;
        const refresh_token = data.refresh_token;
        const _user = await user_model.get_user_by_access_token(access_token,refresh_token);
        if(_user){
            return {
                success:true,
                user_name:_user.user_name,
                _id:_user._id,
                access_token:_user.services.access_token,
                refresh_token:_user.services.refresh_token
            }
        }
        else{
            return {
                success:false,
                message:"wrong access token or refresh token"
            }
        }
    };

    this.grant_new_refresh_token = async function(user_name){
        const user = await user_model.get_user_by_username(user_name);
         if (!user){
             return {
                 success:false,
                 message:"user not found"
             }
         }

         //const access_token = uuidv1();
        const refresh_token =uuidv1();
        user.services.refresh_token= refresh_token;
        //user.services.access_token = access_token;
        // save data 
        const save_access_token = await user_model.update_user(user);
        return {
            success:true,
            message:"login successfull",
            access_token:user.services.access_token,
            refresh_token:user.services.refresh_token
        };
    };



    const compare_password =function (myPassword, hash, cb) {
        bcrypt.compare(myPassword, hash, function (err, IsMatch) {
            if (err) throw err;
            cb(null, IsMatch)
        });
    };
}

module.exports = authfunctions;