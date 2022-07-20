var express = require('express');
var router = express.Router();

var SupplierController = require('../Controllers/supplier')

router.post('/supplier-master', SupplierController.getsuppliers)
router.post('/delete-suppliers', SupplierController.deletesuppliers)

module.exports = router;