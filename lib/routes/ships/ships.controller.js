const express = require('express')
const shipsController = express.Router()
const Ship = require('./ship')


// GET all ships
shipsController.get('/', async (req, res, next) => {
  const ships = await Ship.find()

  res.status(200).send(ships)
})

// GET single ship
shipsController.get('/:id', async (req, res, next) => {
    try {
      const ship = await Ship.findOne({ id: req.params.id })
      console.log(ship)
      res.status(200).send(ship)
    } catch(error) {
      console.log(error)
      res.status(400).json({ msg: error })
    }
  })

// ADD new ship
shipsController.post('/', async (req, res, next) => {
  const ship = await Ship.create(req.body)

  res.status(200).send(ship)
})

// UPDATE existing ship
shipsController.put('/:id', async (req, res, next) => {
  const ship = await Ship.findOneAndUpdate({ id: req.params.id }, { $set: req.body }, { $upsert: true, new: true })

  res.status(200).send(ship)
})

// DELETE a ship
shipsController.delete('/:id', async (req, res, next) => {
  const ship = await Ship.deleteOne({ id: req.params.id })

  res.status(200).send(ship)
})

module.exports = shipsController
