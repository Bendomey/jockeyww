const express = require('express');
const Route = express.Router();

const HomeController = require('../app/Http/Controllers/HomeController');


Route.get('/', HomeController.index);
Route.get('/about', HomeController.about);
Route.get('/contact', HomeController.contact);
Route.get('/djs', HomeController.dj);
Route.get('/events', HomeController.event);


module.exports = Route;