var express = require('express');
var router = express.Router();

var StoreController = require('../Controllers/store')

router.post('/store-master', StoreController.getstores)

router.post('/delete-stores', StoreController.deletestores)

module.exports = router;