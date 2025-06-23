
const Comment = require('../models/Comment');

const isCommentAuthor = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comentario no encontrado' });

    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error de servidor' });
  }
};

module.exports = isCommentAuthor;
