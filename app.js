// Loads environment variables from a secret file named .env into the Node.js process.env object
require('dotenv').config();

// Import Express.js, the most popular web framework for Node.js.
const express = require('express');

// Import the `cors` package, which is a middleware for Express used to enable and configure CORS (Cross-Origin Resource Sharing).
const cors = require('cors');

// Import the native Node.js 'path' module, which contains tools for managing, combining, 
// and manipulating file and folder paths.
const path = require('path');

// creates an instance of the Express application and stores it in the variable named `app`.
const app = express();
app.locals.title = 'My Testing Web Site';

// Imports a plugin for the EJS template engine.
// Its main function is to allow you to use a common base layout
// as a template that already includes the navigation menu and footer,
// so you don't have to repeat that same HTML code on every page of your site.
const expressLayouts = require('express-ejs-layouts');

// EJS template engine configuration
app.set('view engine', 'ejs');

// Change EJS template path
app.set('views', path.join(__dirname, 'MVC', 'views'));

// Extract the <style> and <link> elements from the child views to place them in the <head> of the global layout
app.set("layout extractStyles", true); 

app.set('view cache', false);


// It is an Express middleware that allows your server to understand and process data received in JSON format.
app.use(express.json());

const THIS_HOST = process.env.THIS_HOST || '127.0.0.1';
const THIS_PORT = process.env.THIS_PORT || '4505';
const THIS_URL = `http://${THIS_HOST}:${THIS_PORT}`; 

const allowedOrigins = [...new Set([
    `http://localhost:${THIS_PORT}`,
    `http://127.0.0.1:${THIS_PORT}`,
    THIS_URL
])];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// It is an Express middleware that allows your server to understand and process data sent from native HTML forms.
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, images, client-side JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// We enable the template system (Layouts) to have a common base design.
app.use(expressLayouts); 

// Loads and connects the main router (route aggregator from the routes folder)
// The home route is managed via an WebRoutes.js file located within ./routes
const WebRoutes = require('./routes/WebRoutes');
app.use('/', WebRoutes);

const ApiAudioScribeRoutes = require('./routes/ApiAudioScribeRoutes');
app.use('/api/audioscribe', ApiAudioScribeRoutes); 


// Servir tus archivos públicos habituales (CSS, imágenes, model.glb)
app.use(express.static(path.join(__dirname, 'public')));

// It serves to efficiently silence the automatic requests that web browsers make when looking for your website's icon (the favicon).
app.get('/favicon.ico', (req, res) => res.status(204).end());

module.exports = app;