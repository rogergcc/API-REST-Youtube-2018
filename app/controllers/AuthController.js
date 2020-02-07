const User = require('../models/User');
const bcrypt = require('bcrypt');
const CONFIG = require('../config/config');

const jwt = require('jsonwebtoken');

//Username
//Password

function login(req,res){
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({username})
        .then(user => {
            if(!user) return res.status(404).send({message: 'EL USUARIO NO EXISTE'});
            bcrypt.compare(password,user.password)
                  .then(match => {
                        if(match){
                            payload = {
                                username: user.username,
                                email: user.email,
                                name: user.name,
                                role: user.role
                            }
                            //Acceso
                            
                            // Token signing options
                            var signOptions = {
                                expiresIn:  60,    // 30 s
                            };

                            jwt.sign(payload,CONFIG.SECRET_TOKEN,signOptions,function(error,token){
                                if(error){
                                    res.status(500).send({error});
                                }else{
                                    res.status(200).send({message: 'Acceso',token});
                                }
                            })
                        }else{
                            //No doy Acceso
                            res.status(200).send({message: 'PASSWORD INCORRECTA'});
                        }
                  }).catch(error => {
                    console.log(error);
                    res.status(500).send({error});
                  });
        }).catch(error => {
            console.log(error);
            res.status(500).send({error});
        });
}


// 3. Logout a user
server.post('/logout', (_req, res) => {
    res.clearCookie('refreshtoken', { path: '/refresh_token' });
    // Logic here for also remove refreshtoken from db
    return res.send({
      message: 'Logged out',
    });
  });

  
function logout(req,res){
    let username = req.body.username;
    let password = req.body.password;
    //jwt.verify

}
module.exports = login;
module.exports = logout;