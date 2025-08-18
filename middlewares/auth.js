const jwt = require('jsonwebtoken');
const User = require('../models/User');

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id); 
    if (!user) {
      console.log('Usuario no encontrado en DB');
      return res.status(401).json({ message: 'Usuario no válido' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = auth;
