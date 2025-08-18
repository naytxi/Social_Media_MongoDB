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
        author: req.user._id,
        likes: [],
      });

      await post.populate('author', 'name');

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
      res.status(500).json({ message: 'Error al obtener los posts', error: error.message });
    }
  },

  async getMyPosts(req, res) {
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
      }

      const posts = await Post.find({ author: req.user._id })
        .sort({ createdAt: -1 })
        .populate('author', 'name');

      res.status(200).json({ posts });
    } catch (error) {
      console.error('Error en getMyPosts:', error);
      res.status(500).json({ message: 'Error al obtener tus posts', error: error.message });
    }
  },

  async like(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);

      if (!post) return res.status(404).json({ message: 'Post no encontrado' });

      if (post.likes.includes(req.user._id)) {
        return res.status(400).json({ message: 'Ya has dado like a este post' });
      }

      post.likes.push(req.user._id);
      await post.save();

      await post.populate('author', 'name');

      res.status(200).json({ message: 'Like agregado', post });
    } catch (error) {
      res.status(500).json({ message: 'Error al dar like', error: error.message });
    }
  },

  async unlike(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);

      if (!post) return res.status(404).json({ message: 'Post no encontrado' });

      post.likes = post.likes.filter(userId => userId.toString() !== req.user._id.toString());
      await post.save();

      await post.populate('author', 'name');

      res.status(200).json({ message: 'Like eliminado', post });
    } catch (error) {
      res.status(500).json({ message: 'Error al quitar like', error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);

      if (!post) return res.status(404).json({ message: 'Post no encontrado' });
      if (post.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'No puedes editar este post' });
      }

      const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
      await updatedPost.populate('author', 'name');

      res.status(200).json({ message: 'Post actualizado', post: updatedPost });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el post', error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);

      if (!post) return res.status(404).json({ message: 'Post no encontrado' });
      if (post.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'No puedes eliminar este post' });
      }

      await post.deleteOne();
      res.status(200).json({ message: 'Post eliminado' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el post', error: error.message });
    }
  },

  async searchByTitle(req, res) {
    try {
      const { title } = req.query;
      const posts = await Post.find({ title: new RegExp(title, 'i') })
        .populate('author', 'name');
      res.status(200).json({ posts });
    } catch (error) {
      res.status(500).json({ message: 'Error en la búsqueda', error: error.message });
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
      res.status(500).json({ message: 'Error al obtener el post', error: error.message });
    }
  }

};

module.exports = PostController;
