import express from 'express';
import * as HomeController from './controllers/home.controller.mjs';
import * as WeatherController from './controllers/weather.controller.mjs';

const app = express();
const port = 3000;

app.use(express.json());

/**
 * Home routy
 * Handlery jsou definovány v controllers/home.controller.mjs
 */
app.get('/', HomeController.getHome);
app.get('/o-nas', HomeController.getAbout);

/**
 * Weather routy
 * Handlery jsou definovány v controllers/weather.controller.mjs
 */
app.get('/pocasi', WeatherController.getAll);
app.get('/pocasi/:mesto', WeatherController.getByCity);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
