var express = require('express');
var router = express.Router();

var DistributionController = require('../Controllers/distribution')

router.post('/distribution-center', DistributionController.getdistributions)

module.exports = router;