const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  value: String
})

module.exports = mongoose.model('Product', productSchema)