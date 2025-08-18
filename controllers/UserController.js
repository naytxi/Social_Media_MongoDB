const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');

const JWT_SECRET = process.env.JWT_SECRET;

const UserController = {

  async register(req, res, next) {
    try {
      const { password, ...rest } = req.body;

      if (!password) {
        return res.status(400).json({ message: 'La contraseña es obligatoria' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({ ...rest, password: hashedPassword, role: 'user' });

      const { password: _, ...userSafe } = user.toObject();

      res.status(201).send({ message: "Usuario registrado con éxito", user: userSafe });
    } catch (error) {
      error.origin = 'usuario';
      next(error);
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '2h' });

      res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al hacer login' });
    }
  },

async getProfile(req, res) {
  try {
    const user = await User.findById(req.user._id).populate('followers', 'name');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const posts = await Post.find({ author: req.user._id });

    res.status(200).json({
      user: {
        ...user.toObject(),
        posts: posts || [],
        followersCount: user.followers?.length || 0,
        followerNames: user.followers?.map(f => f.name) || []
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener perfil con posts y seguidores' });
  }
},

  async findByName(req, res) {
  try {
    const { name } = req.query;
    const users = await User.find({ name: { $regex: name, $options: 'i' } });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar por nombre' });
  }
},

async findById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('followers', 'name');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar por ID' });
  }
},

logout(req, res) {
  try {
    res.status(200).json({
      message: 'Logout exitoso. El token debe ser eliminado en el cliente.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al cerrar sesión' });
  }
}
};

module.exports = UserController;
