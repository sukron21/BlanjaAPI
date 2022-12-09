const express = require('express');
const { list, destroy, update, insert, detailProduct, searchName, updatePhoto, userProduct, filter } = require('../controller/product.controller');
const { uploadPhoto } = require('../middleware/uploadImg');
const { removePhoto } = require('../middleware/deleteImg');

const router = express.Router();

router
  .get('/product', list)
  .get('/product/:id', detailProduct)
  .get('/product/search/:search', searchName)
  .get('/product/user/:id', userProduct)
  .post('/product/filter', filter)
  .post('/product', uploadPhoto, insert)
  .put('/product/:id', update)
  .put('/product/photo/:id', uploadPhoto, updatePhoto)
  .delete('/product/:id', removePhoto, destroy);

module.exports = router;
