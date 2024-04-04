const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose")
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const { initSocket } = require('./socket/index')

const app = express()
require('dotenv').config()

const corsOptions = {
<<<<<<< Updated upstream
  origin: [process.env.PROD2_CLIENT_URL, process.env.PROD_CLIENT_URL,process.env.DEV_CLIENT_URL, process.env.VERCEL_CLIENT_URL],
=======
  origin: [process.env.DEV_CLIENT_URL, process.env.PROD_CLIENT_URL],
>>>>>>> Stashed changes
  credentials: true
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SIGNATURE))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.send('Hi there!')
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connection Success"))
  .catch((err) => console.log('DB connection Error', err.message))

const server = app.listen(process.env.PORT, () => {
  console.log(`App is listening to port ${process.env.PORT}`)
})

// socket.io
initSocket(server, corsOptions)

module.exports = app;