const express = require('express')
const app = express()
const PORT = 5000
const { dbConnection } = require('./config/config')
const { typeError }= require('./middlewares/errors')

app.use(express.json())
dbConnection()

app.use('/users', require('./routes/users'))
app.use(typeError)

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))


