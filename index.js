const express = require('express')
require('dotenv').config();
const app = express()


const { dbConnection } = require('./config/config')
const { typeError }= require('./middlewares/errors')
const postRoutes = require('./routes/posts');

const PORT = process.env.PORT || 5000;


app.use(express.json())
dbConnection()

app.use('/users', require('./routes/users'))
app.use(typeError)

app.use('/posts', postRoutes);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))


