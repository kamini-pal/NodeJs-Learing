const express = require('express')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routs/auth.rout')
const musicRoutes = require('./routs/music.route')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/auth', authRoutes)
app.use('/api', musicRoutes)

module.exports = app