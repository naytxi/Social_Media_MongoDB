const Comment = require('../models/Comment');
const Post = require('../models/Post');

const CommentController = {

  async getCommentsByPost(req, res) {
    try {
      const { postId } = req.params;
      const comments = await Comment.find({ post: postId })
        .sort({ createdAt: 1 })
        .populate('author', 'name email');
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los comentarios', error: error.message });
    }
  },

 
  async createComment(req, res) {
    try {
      const { postId } = req.params;
      const { content } = req.body;

      if (!content || !content.trim()) {
        return res.status(400).json({ message: 'El contenido es obligatorio' });
      }

      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post no encontrado' });
      }

      const comment = await Comment.create({
        content,
        author: req.user._id,
        post: postId,
      });

      await comment.populate('author', 'name');

      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el comentario', error: error.message });
    }
  },


  async deleteComment(req, res) {
    try {
      const { id } = req.params;
      const comment = await Comment.findById(id);
      if (!comment) return res.status(404).json({ message: 'Comentario no encontrado' });

      if (comment.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'No autorizado' });
      }

      await comment.deleteOne();
      res.status(200).json({ message: 'Comentario eliminado' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el comentario', error: error.message });
    }
  },
};

module.exports = CommentController;
