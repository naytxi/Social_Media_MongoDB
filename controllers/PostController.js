const Post = require('../models/Post');

const PostController = {


  async create(req, res, next) {
    try {
      const { title, content, image } = req.body;

      if (!title || !content) {
        return res.status(400).json({ message: 'El título y el contenido son obligatorios' });
      }

      const post = await Post.create({
        title,
        content,
        image: image || null,
        author: req.user.id,
        likes: [],
      });

      res.status(201).json({ message: 'Post creado', post });
    } catch (error) {
      next(error);
    }
  },

 
  async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;

      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('author', 'name');

      const total = await Post.countDocuments();

      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalPosts: total,
        posts
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los posts' });
    }
  },


  async like(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);

      if (!post) return res.status(404).json({ message: 'Post no encontrado' });

      if (post.likes.includes(req.user.id)) {
        return res.status(400).json({ message: 'Ya has dado like a este post' });
      }

      post.likes.push(req.user.id);
      await post.save();

      res.status(200).json({ message: 'Like agregado', post });
    } catch (error) {
      res.status(500).json({ message: 'Error al dar like' });
    }
  },


  async unlike(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);

      if (!post) return res.status(404).json({ message: 'Post no encontrado' });

      post.likes = post.likes.filter(userId => userId.toString() !== req.user.id);
      await post.save();

      res.status(200).json({ message: 'Like eliminado', post });
    } catch (error) {
      res.status(500).json({ message: 'Error al quitar like' });
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


  async searchByTitle(req, res) {
    try {
      const { title } = req.query;
      const posts = await Post.find({ title: new RegExp(title, 'i') })
        .populate('author', 'name');
      res.status(200).json({ posts });
    } catch (error) {
      res.status(500).json({ message: 'Error en la búsqueda' });
    }
  },


  async getById(req, res) {
    try {
      const post = await Post.findById(req.params.id)
        .populate('author', 'name email')
        .populate('comments.user', 'name');

      if (!post) return res.status(404).json({ message: 'Post no encontrado' });

      res.status(200).json({ post });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el post' });
    }
  }
};

module.exports = PostController;
