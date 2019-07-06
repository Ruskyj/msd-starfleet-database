const express = require('express')
const ships = require('./ships/ships.controller')
const router = express.Router()

router.use('/ships', ships)

module.exports = router
