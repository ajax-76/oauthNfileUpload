require('dotenv').config();
const express =require('express');
const app =express();
const cors =require('cors');
const morgan = require('morgan');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(morgan('dev')); // support encoded bodies
app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(urlencodedParser);
const config = require('./library/config/env_config');
var s3logger = require('./library/helper/fileuploader');
const model_object = require('./library/models/dummy');
const env_config = require('./library/config/env_config');
const converter = require('json-2-csv');

app.post('/upload_data',async (req,res)=>{
    try{
        const type = req.body.type;
        const size = parseInt(req.body.size);
        console.log(size)
        const val = await model_object.get_type_size(type,size);
        //create csv buffer
        const source = await new Promise((resolve,reject)=>{
            converter.json2csv(val, (err, csv) => {
                if (err) {
                    throw err;
                }
                resolve(csv);
            });
        });
    
        var logtime = new Date();
        var path = `${env_config.storage_name}/${type}/${size}/${logtime.toDateString()}/${logtime.toLocaleTimeString()}/${type}-${size}.csv`;
        console.log(source,path,"dta")
        s3logger.put({
            path:path,
            data:source,
            timestamp:logtime
        }).then(msg=>{
            return res.json(`${env_config.storage_url}/${path}`);
        });
    }
    catch(err){
        return res.status(500);
    }
    

})


app.listen(config.server_port,()=>{
    console.log(`fileupload server listening to port ${config.server_port}`);
});