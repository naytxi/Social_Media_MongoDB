const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'tu_clave_secreta_super_segura'; 

const UserController = {
    async register(req, res, next) {
    try {
      const user = await User.create({ ...req.body, role: 'user' })
      res.status(201).send({ message: "Usuario registrado con éxito", user })
    } catch (error) {
      error.origin = 'usuario'
      next(error)
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

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al hacer login' });
    }
  },

  getProfile(req, res) {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener perfil' });
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
