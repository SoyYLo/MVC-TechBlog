// Import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Methods for sequelize models relationshipsp

// user hasMany posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// post belongsTo single user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// user hasMany comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// comment belongsTo single user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// post hasMany comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: "CASCADE"
});

// comment belongsTo single post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// Export user, post, comment
module.exports = { User, Post, Comment};