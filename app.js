const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')

// import routers
const productsRoute = require('./api/routes/products')

const ordersRoute = require('./api/routes/orders')

mongoose.connect('mongodb+srv://bishal:Nameshake5@test-cluster-leaxn.mongodb.net/test?retryWrites=true&w=majority')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

// routes
app.use('/products', productsRoute)
app.use('/orders', ordersRoute)

// error handler
app.use((req, res, next) => {
  const error = new Error('page not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})
module.exports = app

