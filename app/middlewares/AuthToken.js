const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
//https://www.developerro.com/2019/03/12/jwt-api-authentication/
//https://blog.ezteven.com/tech/2019/05/30/utiliza-jwt-con-laravel-para-apis.html
module.exports = function(req,res,next){
    if(req.path != '/auth/login'){
        if(req.headers.authorization){
            let token = req.headers.authorization.split(' ')[1];
            jwt.verify(token,CONFIG.SECRET_TOKEN,function(error,decoded){
                if(error) return res.status(403).send({message: 'No tienes los permisos suficientes para estar aquí...',error});
                if(req.method != 'GET'){
                    if(decoded.role == 'admin') next();
                    else res.status(403).send({message: 'No tienes los permisos suficientes para estar aquí...'});
                }else{
                    next();
                }
            });
        }else res.status(403).send({message: 'No tienes los permisos suficientes para estar aquí...'});
    }else next();
}