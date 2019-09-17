const express = require('express');
const Route = express.Router();

const HomeController = require('../app/Http/Controllers/HomeController');
const AdminController = require('../app/Http/Controllers/Dashboard/AdminController');
const Middleware = require('../app/Http/middleware/middleware');
const ErrorHandler = require('../app/Config/ErrorHandlers');


Route.get('/', HomeController.index);
Route.get('/about', HomeController.about);
Route.get('/contact', HomeController.contact);
Route.get('/djs', HomeController.dj);
Route.get('/events', HomeController.event);


//Admin dashboard routes
Route.get('/admin/dashboard', Middleware.ensureAuthenticated, AdminController.index);
Route.route('/admin/settings')
    .get(Middleware.ensureAuthenticated, AdminController.settings);

module.exports = Route;