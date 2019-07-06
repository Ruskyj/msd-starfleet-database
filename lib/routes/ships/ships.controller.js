const express = require('express')
const shipsController = express.Router()
const Ship = require('./ship')

const formatShipList = ships => ships.map(({ id, name, registry, speed }) => ({
  id,
  name,
  speed,
  ...registry ? { registry } : {},
}))


// GET all ships
shipsController.get('/', async (req, res, next) => {
  const ships = await Ship.find()
  return res.status(200).send(formatShipList(ships))
})

// GET single ship
shipsController.get('/:id', async (req, res, next) => {
    try {
      const ship = await Ship.findOne({ id: req.params.id })

      if (!ship) {
        return res.status(404).send(`Ship #${req.params.id} not in the records!`)
      }

      return res.status(200).send(formatShipList([ship]))
    } catch(err) {
      return res.status(400).send(err.message)
    }
  })

// ADD new ship
shipsController.post('/', async (req, res, next) => {
  try {
    const ship = await Ship.create(req.body)

    if (ship) {
      const ships = await Ship.find()
      return res.status(200).send(formatShipList(ships))
    }
  } catch(err) {
    return res.status(400).send(err.message)
  }
})

// UPDATE existing ship
shipsController.put('/:id', async (req, res, next) => {
  try {
    const ship = await Ship.findOneAndUpdate({ id: req.params.id }, { $set: req.body }, { $upsert: true, new: true })

    return res.status(200).send(formatShipList([ship]))
  } catch(err) {
    return res.status(400).send(err.message)
  }
})

// DELETE a ship
shipsController.delete('/:id', async (req, res, next) => {
  try { 
    const response = await Ship.deleteOne({ id: req.params.id })

    if (response.deletedCount === 0) {
      return res.status(404).send(`Ship #${req.params.id} not in the records!`)
    } else {
      const ships = await Ship.find()
      return res.status(200).send(formatShipList(ships))
    }
  } catch(err) {
    return res.status(400).send(err.message)
  }
})

module.exports = shipsController
