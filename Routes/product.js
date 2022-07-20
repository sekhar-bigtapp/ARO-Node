var express = require('express');
var router = express.Router();

var ProductController = require('../Controllers/product')

router.post('/product-master', ProductController.getproducts)
var ProductController = require('../Controllers/product')

router.post('/delete-products', ProductController.deleteproducts)

module.exports = router;