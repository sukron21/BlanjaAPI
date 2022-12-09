const express = require('express');
const { list, detail, insert, update, destroy } = require('../controller/address.controller');

const router = express.Router();

router
.get('/address/user/:id', list)
.get('/address/:id', detail)
.post('/address', insert)
.put('/address/update/:id', update)
.delete('/address/:id', destroy);

module.exports = router;