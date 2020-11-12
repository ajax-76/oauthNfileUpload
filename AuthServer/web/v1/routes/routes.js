const express = require('express');
const router = express.Router();
const user_object= require('../../../library/models/user');
const auth= require('../../../library/authfunctions/baseauth');
const _iauthfunctions=require('../interfaces/interface')(new auth(user_object));


router.post('/create_user',async (req,res)=>{
    //console.log("aya")
    try{
        const user_name = req.body.user_name;
        const password = req.body.password;
        if (user_name==undefined || user_name=="")
        return res.status(400).send("username required");
        if(password==undefined || password=="")
        return res.status(400).send("password required");
        //console.log("aya")

        // check user : 
        const user = await user_object.get_user_by_username(user_name);
        if(user)
        return res.send("user already exist");
        // create user : 
        await _iauthfunctions.create_users({
            user_name:user_name,
            password:password
        });
        return res.send("user created successfully")
    }
    catch(err){
        return res.status(500);
    }
});

router.post('/login',async (req,res)=>{
    try{
        const user_name = req.body.user_name;
        const password = req.body.password;
        if (user_name==undefined || user_name=="")
        return res.status(400).send("username required");
        if(password==undefined || password=="")
        return res.status(400).send("password required");

        // login user
        const response = await _iauthfunctions.login_user({
            user_name:user_name,
            password:password
        })
        return res.json(response);
    }
    catch(err){
        return res.status(500);
    }
});

router.post('/user_authenticate',async (req,res)=>{
    try{
        const response = await _iauthfunctions.authenticate_user({
            access_token:req.body.access_token,
            refresh_token:req.body.refresh_token
        });
        return res.json(response);
    }
    catch(err){
        return res.status(500);
    }
});

router.post('/new_refresh_token',async (req,res)=>{
    try{
        const user_name = req.body.user_name;
        if (user_name==undefined || user_name=="")
        return res.status(400).send("username required");
        const response = await _iauthfunctions.grant_new_refresh_token(user_name);
        return res.json(response);
    }
    catch(err){
        return res.status(500);
    }
})
module.exports =router;