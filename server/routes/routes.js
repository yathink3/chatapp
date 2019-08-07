const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
// router.route('/register').post(controller.register);
router.post('/register',controller.register);
module.exports = router;