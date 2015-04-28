'use strict';

var express = require('express');
var controller = require('./manifesto.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/randomise', controller.randomise);
router.get('/:id', controller.show);

module.exports = router;