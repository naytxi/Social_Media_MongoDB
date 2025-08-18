const express = require('express');
require('dotenv').config();
const cors = require('cors');   
const app = express();

const { dbConnection } = require('./config/config');
const { typeError } = require('./middlewares/errors');
const postRoutes = require('./routes/posts');

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

dbConnection();

app.use('/api/users', require('./routes/users'));  
app.use('/api/posts', postRoutes);

app.use(typeError);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
