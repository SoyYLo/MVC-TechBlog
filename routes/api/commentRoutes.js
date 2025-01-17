const api = require('express').Router();
const { Comment, User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

api.get('/', async (req, res) => {
    try {
      // Get all comments and JOIN with user data
      const commentData = await Comment.findAll({
        include: [{ model: User }, { model: Post }],
      });
  
      //Serialize data
      const comments = commentData.map((comment) => comment.get({ plain: true }));
      console.log(comments);
      res.status(200);
    } catch (err) {
      res.status(500).json(err);
    }
  });

api.post('/', withAuth, async (req, res) => {
    try {
        
        const newComment = await Comment.create({
          ...req.body,
          user_id: req.session.user_id, 
         });

         res.status(200).json(newComment);
        } catch (err) {
          res.status(400).json(err);
        }
      });
  
      api.delete('/:id', withAuth, async (req, res) => {
    try { 
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
    },
}); 

if (!commentData) {
  res.status(404).json({ message: 'No comment found with this provided id' });
  return;
}

res.status(200).json(commentData);
} catch (err) {
res.status(500).json(err);
}
});
//Export api
module.exports = api;