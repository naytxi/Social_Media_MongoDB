const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'tu_clave_secreta_super_segura'; 

const UserController = {
  async register(req, res) {
    try {
      const { name, email, password, age } = req.body;

      
      if (!name || !email || !password || !age) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }

      
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'El correo ya está registrado' });
      }

     
      const hashedPassword = await bcrypt.hash(password, 10);

     
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        age,
      });

      res.status(201).json({ message: 'Usuario registrado con éxito', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al registrar el usuario' });
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
}
};

module.exports = UserController;
