const Mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(Mongoose)

const ShipSchema = new Mongoose.Schema({
  name: { type: String, required: true },
  registry: { type: String, required: false },
  speed: { type: String, required: true }
})

ShipSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = Mongoose.model('Ship', ShipSchema)
