const express = require('express');
const util=require('../utility')
const router = express.Router();
const controller = require('../controller/controller');
router.post('/login',controller.login);
router.post('/register',controller.register);
router.post('/forgot',controller.forgot);
router.post('/forgot/:token',util.varify,controller.resetPassword);
module.exports = router;