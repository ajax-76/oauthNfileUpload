
module.exports=function(app){
    app.use('/v1',require('./v1/routes/routes'));
}
