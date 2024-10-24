const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers'); // Matches your controllers folder structure
const helpers = require('./utils/helpers'); // Matches utils/helpers.js

const sequelize = require('./config/connection'); // Ensuring consistent file paths
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers }); // Register the helpers from utils/helpers.js

const sess = {
  secret: 'Super secret secret', // The session configuration
  cookie: {
    maxAge: 300000, // 5 minutes in milliseconds
    httpOnly: true, // Ensures the cookie is not accessible via JavaScript
    secure: false, // In production, set this to true for HTTPS
    sameSite: 'strict', // Ensures cookies are sent in the same site context only
  },
  resave: false, // Prevents resaving session if not modified
  saveUninitialized: true, // Saves new sessions, even if not modified
  store: new SequelizeStore({
    db: sequelize, // Links session store with Sequelize
  }),
};

app.use(session(sess)); // Activating session middleware

// Inform Express.js which template engine to use
app.engine('handlebars', hbs.engine); // Setting up Handlebars
app.set('view engine', 'handlebars'); // Define Handlebars as view engine

app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public folder

app.use(routes); // Use routes from controllers directory

// Sync the Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
