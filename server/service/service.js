/********************************************************************************************************************
 * @Execution : default node : cmd> npm start
 * @Purpose : chatapp peer-to-peer communication
 * @description: signIn and registration for the chatapp
 * @overview:  backend api's
 * @author : yathin k <yathink3@gmail.com>
 * @version : 1.0
 * @since : 09-aug-2019
 *******************************************************************************************************************/


//importing model modules
var model = require('../app/model/model');

/**
  * @desc rdirecting data to models
  * @param  -req,call - it contains the req and callback function
  * @return returning back to the model and checking  data or error
*/
exports.register = (req, call) => {
    model.Register(req, (err, data) => {
        if (err) call(err);
        else call(null, data);
    })
}

/**
  * @desc rdirecting data to models
  * @param  -req,call - it contains the req and callback function
  * @return returning back to the model and checking  data or error
*/
exports.login = (req, call) => {
    model.Login(req, (err, data) => {
        if (err) call(err);
        else call(null, data);
    })
}

/**
  * @desc rdirecting data to models
  * @param  -req,call - it contains the req and callback function
  * @return returning back to the model and checking  data or error
*/
exports.findmail = (req, call) => {
    model.Findmail(req, (err, data) => {
        if (err) call(err);
        else call(null, data);
    })
}

/**
  * @desc rdirecting data to models
  * @param  -req,call - it contains the req and callback function
  * @return returning back to the model and checking  data or error
*/
exports.resetPassword = (req, call) => {
    model.resetPassword(req, (err, data) => {
        if (err) call(err);
        else call(null, data);
    })
}