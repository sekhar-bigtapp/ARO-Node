var express = require('express');
var router = express.Router();

var ReorderController = require('../Controllers/reorderfrequency')

router.post('/reorder-frequency', ReorderController.getreorder)

module.exports = router;