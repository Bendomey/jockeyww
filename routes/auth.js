import express from 'express';
import passport from 'passport';
import LoginController from '../app/Http/Controllers/Auth/LoginController';
import RegisterController from '../app/Http/Controllers/Auth/RegisterController';
import ResetController from '../app/Http/Controllers/Auth/ResetController';
import ErrorHandler from '../app/Config/ErrorHandlers';
import Middleware from '../app/Config/middleware';
const Route = express.Router();


//register
Route.get('/register',RegisterController.index);
Route.post('/register', RegisterController.validate_user, RegisterController.register);

//login
Route.get('/login', Middleware.forwardAuthenticated, LoginController.index);
Route.post('/login',
	Middleware.forwardAuthenticated,
	LoginController.rememberMe,
	passport.authenticate('local',{
		failureRedirect:'/users/login',
		failureFlash:true,
	}),
	LoginController.login_redirect
);
Route.get('/logout',LoginController.logout);



export default Route;