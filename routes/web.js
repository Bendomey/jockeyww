import express from 'express';
const Route = express.Router();

import HomeController from '../app/Http/Controllers/HomeController';


Route.get('/',HomeController.index);
Route.get('/about',HomeController.about);
Route.get('/contact',HomeController.contact);
Route.get('/djs',HomeController.dj);
Route.get('/events',HomeController.event);


export default Route;