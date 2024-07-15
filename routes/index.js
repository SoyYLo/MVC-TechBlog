const api = require('express').Router();

// import routers
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

api.use('/', homeRoutes);
api.use('/api', apiRoutes);

// Export router
module.exports = api;