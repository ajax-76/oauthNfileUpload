const { request_logger } = require('../library/config/config/database');

const logger = require('../library/models/logger')
module.exports=function(app){

    // logger
    var loggermiddleware = function(req,res,next){
          logger.logger({header:req.headers}).then(bl=>{
              console.log("request  logged");
              //console.log(req.headers);
            });
         
          next();
      }
    app.use('/v1',loggermiddleware,require('./v1/routes/routes'));
}
