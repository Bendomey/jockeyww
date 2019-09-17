const express = require('express');
const passport = require('passport');
const LoginController = require('../app/Http/Controllers/Auth/LoginController');
const RegisterController = require('../app/Http/Controllers/Auth/RegisterController');
const ResetController = require('../app/Http/Controllers/Auth/ResetController');
const UpdateController = require('../app/Http/Controllers/Auth/UpdateController');
const ErrorHandler = require('../app/Config/ErrorHandlers');
const Middleware = require('../app/Http/middleware/middleware');
const Route = express.Router();


//register
Route.route('/register')
    .get(RegisterController.index)
    .post(RegisterController.validate_user, RegisterController.register);

//login
Route.route('/login')
    .get(Middleware.forwardAuthenticated, LoginController.index)
    .post(
        Middleware.forwardAuthenticated,
        LoginController.rememberMe,
        passport.authenticate('local', {
            failureRedirect: '/users/login',
            failureFlash: true,
        }),
        LoginController.adminRoute,
        LoginController.login_redirect
    );

Route.get('/logout', LoginController.logout);


//resetting
//reset flow
Route.route('/forgot_password')
    .get(Middleware.forwardAuthenticated, ResetController.index)
    .post(ErrorHandler.catchErrors(ResetController.forgot));
Route.route('/reset_password/:token')
    .get(ErrorHandler.catchErrors(ResetController.reset))
    .post(ResetController.confirmedPasswords, ResetController.update);

//update profile
Route.post('/update_profile', Middleware.ensureAuthenticated, UpdateController.sanitize_profile_body, ErrorHandler.catchErrors(UpdateController.update_profile));
Route.post('/update_security', Middleware.ensureAuthenticated, UpdateController.sanitize_security_body, ErrorHandler.catchErrors(UpdateController.update_security));
module.exports = Route;