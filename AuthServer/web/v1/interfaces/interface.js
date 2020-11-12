var authinterface=function(inauthfunctions){
    return {
        create_users:function({user_name,password}){
            return inauthfunctions.create_users({user_name,password});
        },
        login_user:function({user_name,password}){
            return inauthfunctions.login_user({user_name,password})
        },
        authenticate_user:function({access_token,refresh_token}){
            return inauthfunctions.authenticate_user({access_token,refresh_token});
        },
        grant_new_refresh_token:function(user_name){
            return inauthfunctions.grant_new_refresh_token(user_name)
        }
    }

};

module.exports= authinterface;