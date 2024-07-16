//Dependencies
const express = require('express');
const path = require('path');
const routes = require('./routes');
const helpers = require('./utils/helpers');

// Import express-handlebars
const expressHB = require('express-handlebars');
// Handlebars.js engine with custom helpers
const handlebars = expressHB.create({ helpers });
const session = require('express-session');

// express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions
const sess = {
    secret: 'Super secret',
    cookie: {
      // Stored in milliseconds
      maxAge: 60 * 60 * 1000, // expires after 1 hour
    },
    resave: false,
    saveUninitialized: true,
  };
  app.use(session(sess));

  // Inform Express.js to use Handlebars.js as the default template engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//import sequelize connection
const sequelize = require('./config/connection');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up for the routes
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => console.log(`Sever listening on http://localhost:${PORT}`));
});