//importing required modules
const express = require('express');
const util=require('../utility')
const controller = require('../controller/controller');

//creating an express.Router object
const router = express.Router();

//routes the specified end points
router.post('/login',controller.login);
router.post('/register',controller.register);
router.post('/forgot',controller.forgot);
router.post('/forgot/:token',util.varify,controller.resetPassword);

module.exports = router;