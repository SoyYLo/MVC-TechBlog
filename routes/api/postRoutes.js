const api = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

api.post('/', withAuth, async (req, res) => {
    try {
        const user = await User.findByPk(req.session.user_id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  api.put('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.update({
        ...req.body,
        user_id: req.session.user_id,
      }, {
        where: {
          id: req.params.id,
        }
      });

      res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  

      api.delete('/:id', withAuth, async (req, res) => {
        try {
          const postData = await Post.destroy({
            where: {
              id: req.params.id,
              user_id: req.session.user_id,
            },
          });
      
          if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
          }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  
  //Export router
  module.exports = api;