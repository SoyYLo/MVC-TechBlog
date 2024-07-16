const api = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

api.use('/users', userRoutes);
api.use('/posts', postRoutes);
api.use('/comments', commentRoutes)
//Export router
module.exports = api;