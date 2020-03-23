const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../models/product')
router.get('/', (req, res, next) => {
  res.status(200).json({
    file: 'hush'
  })
})
router.post('/', (req, res, next) => {
  const prod = {
    name: req.body.name,
    value: req.body.value
  }
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    ...prod
  })
  product.save().then(doc => {
    console.log(doc)
    res.status(200).json({
      res: doc
    })
  }).catch(err => {
    console.log(err)

  })
})
router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.findOneAndUpdate({ _id: id }, { $set: { value: req.body.value } }, { new: true }).then(doc => {
    console.log(doc)
    res.status(200).json({
      res: doc
    })
  }).catch(err => console.log(err))
})
router.get('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.findById(id).exec().then(doc => { res.status(200).json({ res: doc }) }).catch(err => console.log(err))
})
module.exports = router
