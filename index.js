const express = require('express')
const app = express()
const PORT = 5000
const { dbConnection } = require('./config/config')

app.use(express.json())
dbConnection()

app.get('/test', (req, res) => {
  res.send('Ruta /test funciona');
});

app.use('/users', require('./routes/users'))

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))


