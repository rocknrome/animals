// R'N'R December 31, 2023

// DEPENDENCIES
require("dotenv").config(); // this is how we make use of our .env variables
require("./config/db"); // bring in our db config
const express = require("express");
const morgan = require("morgan"); // logger
const methodOverride = require("method-override");
const animalRouter = require("./routes/animals"); // Importing animal routes

const app = express();
const { PORT = 3013 } = process.env;
const seedData = require("./models/seed");

// Bring in our Animal model
const Animal = require("./models/animal"); // Importing Animal model

/**
 * Middleware
 */
app.use((req, res, next) => {
    req.model = {
        Animal, // Updated to Animal model
        seedData
    };
    console.log("this is middleware");

    // go to the next app method
    next();
});
app.use(morgan("dev")); // logging
app.use(express.urlencoded({ extended: true })); // body parser this is how we get access to req.body
app.use(methodOverride("_method")); // Lets us use DELETE PUT HTTP verbs
app.use("/public", express.static("public")); // serve up our public directory with the url prefix of /public/styles.css
// Set the view engine to ejs
app.set('view engine', 'ejs');


/**
 * Routes & Router
 */

// Root Route
app.get('/', async (req, res) => {
    try {
        const animals = await req.model.Animal.find({});
        res.render('index', { animals });
    } catch (error) {
        res.status(500).send('Error occurred: ' + error.message);
    }
});


// app.use(prefix url, router to execute)
app.use("/animals", animalRouter); // Updated to use animalRouter

/**
 * Server listener
 */
app.listen(PORT, () => console.log(`I am alive on port ${PORT}`));
