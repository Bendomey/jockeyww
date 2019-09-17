const express = require('express');
const passport = require('passport');
const LoginController = require('../app/Http/Controllers/Auth/LoginController');
const RegisterController = require('../app/Http/Controllers/Auth/RegisterController');
const ResetController = require('../app/Http/Controllers/Auth/ResetController');
const ErrorHandler = require('../app/Config/ErrorHandlers');
const Middleware = require('../app/Http/middleware/middleware');
const Route = express.Router();


//register
Route.get('/register', RegisterController.index);
Route.post('/register', RegisterController.validate_user, RegisterController.register);

//login
Route.get('/login', Middleware.forwardAuthenticated, LoginController.index);
Route.post('/login',
    Middleware.forwardAuthenticated,
    LoginController.rememberMe,
    passport.authenticate('local', {
        failureRedirect: '/users/login',
        failureFlash: true,
    }),
    LoginController.login_redirect
);
Route.get('/logout', LoginController.logout);



module.exports = Route;