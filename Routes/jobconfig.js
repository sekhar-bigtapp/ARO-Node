var express = require('express');
var router = express.Router();

var JobconfigController = require('../Controllers/jobconfig')

router.post('/job-config', JobconfigController.getjobconfig)

module.exports = router;