const express = require('express')
const shipsController = express.Router()
const Ship = require('./ship')

shipsController.post('/', async (req, res, next) => {
  const ship = await Ship.create(req.body)

  res.status(200).send(ship)
})

shipsController
  .put('/:id', async (req, res, next) => {
    const ship = await Ship.findByIdAndUpdate(req.params.id, { $set: req.body }, { $upsert: true, new: true })
  
    res.status(200).send(ship)
  })

shipsController
  .get('/', async (req, res, next) => {
    const ships = await Ship.find()

    res.status(200).send(ships)
  })

shipsController
  .get('/:id', async (req, res, next) => {
    const ship = await Ship.findById(req.params.id)

    res.status(200).send(ship)
  })

shipsController
  .delete('/:id', async (req, res, next) => {
    const ship = await Ship.deleteOne({ _id: req.params.id })

    res.status(200).send(ship)
  })

module.exports = shipsController
