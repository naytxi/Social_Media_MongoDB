const express = require('express')
const app = express()
const PORT = 5000
const { dbConnection } = require('./config/config')
const { typeError }= require('./middlewares/errors')
const postRoutes = require('./routes/posts');

app.use(express.json())
dbConnection()

app.use('/users', require('./routes/users'))
app.use(typeError)

app.use('/posts', postRoutes);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))


