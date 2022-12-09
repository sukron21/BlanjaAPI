const express = require('express')
const { list, destroy, detail, register,login,listSeller,detailSeller,updatePhoto, listCustomer, detailCustomer, updateCustomer, updateSeller, checkEmail, chat } = require('../controller/user.controller')
const {uploadPhotouser} = require ('../middleware/uploadImg');
const {removePhotoUser} = require('../middleware/deleteImg');

const router = express.Router()

router
  .get('/userlist', list)
  .get('/user/:id', detail)
  .get('/user/email/:email', checkEmail)
  .get('/customer', listCustomer)
  .get('/customer/:id', detailCustomer)
  .get('/seller', listSeller)
  .get('/seller/:id', detailSeller)
  .get('/user/chat/:id', chat)
  .put('/customer/:id', updateCustomer)
  .put('/seller/:id', updateSeller)
  .put('/user/image/:id', removePhotoUser, uploadPhotouser, updatePhoto)
  .post('/register', register)
  .post('/login', login)
  .delete('/user/:id', destroy);

module.exports = router
