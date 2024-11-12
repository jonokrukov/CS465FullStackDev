var express = require('express');
var router = express.Router();
var controller = require('../controllers/meals');

// Get Meals page
router.get('/', controller.meals);

module.exports = router;