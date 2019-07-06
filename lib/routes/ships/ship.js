const Mongoose = require('mongoose')

const ShipSchema = new Mongoose.Schema({
  name: String,
  speed: String
})

module.exports = Mongoose.model('Ship', ShipSchema)
