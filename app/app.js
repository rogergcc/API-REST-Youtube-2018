const express = require('express');
const bodyParser = require('body-parser');

const App = express();

const Product = require('./routes/product');
const User = require('./routes/user');
const Auth = require('./routes/auth');

const AuthToken = require('./middlewares/AuthToken');

App.use(AuthToken);

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({extended: false}));

App.use('/product',Product);
App.use('/user',User);
App.use('/auth',Auth);

//android
//https://medium.com/@theanilpaudel/using-the-power-of-retrofit-okhttp-and-dagger-2-for-jwt-token-authentication-ad8db6121eac


//Nodejs
//https://www.positronx.io/build-secure-jwt-token-based-authentication-api-with-node/
module.exports = App;