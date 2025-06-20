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
  },

    async update(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);

      if (!post) return res.status(404).json({ message: 'Post no encontrado' });

      if (post.author.toString() !== req.user.id) {
        return res.status(403).json({ message: 'No puedes editar este post' });
      }

      const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({ message: 'Post actualizado', post: updatedPost });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el post' });
    }
  },
  
    async delete(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);

      if (!post) return res.status(404).json({ message: 'Post no encontrado' });

      if (post.author.toString() !== req.user.id) {
        return res.status(403).json({ message: 'No puedes eliminar este post' });
      }

      await post.deleteOne();
      res.status(200).json({ message: 'Post eliminado' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el post' });
    }
  },
};
  
module.exports = PostController;