const Post = require('../models/Post');

const PostController = {

  async create(req, res, next) {
    try {
      const { title, content } = req.body;

      if (!title || !content) {
        return res.status(400).json({ message: 'Debe tener un título y contenido' });
      }

      const post = await Post.create({
        title,
        content,
        author: req.user.id,
      });

      res.status(201).json({ message: 'Post creado', post });
    } catch (error) {
      next(error);
    }
  }
};
  
module.exports = PostController;