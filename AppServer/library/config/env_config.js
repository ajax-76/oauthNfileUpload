module.exports={
    connectionstring:process.env.MONGO_URL,
    database:process.env.MONGO_DATABASE,
    server_port:process.env.SERVER_PORT,
    jwt_secret:process.env.JWT_SECRET,
    saltrounds:process.env.SALT_ROUNDS,
    AUTH_SERVER:process.env.AUTH_SERVER
};
