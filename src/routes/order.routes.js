const express = require('express')
const { list, detail, update, insert, detailOrder, detailUserOrder, insertTransaction, listTransaksi, listTransaksiID, allOrderedProduct, detailUserOrderWithStatus } = require('../controller/order.controller')

const router = express.Router()

router
  .get('/order', list)
  .get('/order/user/:id', detailUserOrder)
  .get('/order/userstatus/:id', detailUserOrderWithStatus)
  .get('/order/seller/:id', allOrderedProduct)
  .get('/orderproduct/:id', detailOrder)
  .get('/order/:id', detail)
  .put('/order/:id', update)
  .post('/order', insert)
  .get('/transaction', listTransaksi)
  .get('/transaction/:id', listTransaksiID)
  .post('/transaction', insertTransaction)
  
module.exports = router
