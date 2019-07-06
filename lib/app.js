const express = require('express')
const helmet = require('helmet')
const routes = require('./routes')
require('./db')

const app = express()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', routes)

module.exports = app
