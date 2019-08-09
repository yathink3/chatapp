//importing modules
const util = require('../../utility')
const mongoose = require('mongoose');
const dcrypt = require('bcryptjs');
const emailExistence = require('email-existence');

//userdata scheme
var Schema = mongoose.Schema;
const userData = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }

})
//stored user data in register
var register = mongoose.model('user', userData);

/**
 * @desc  checking user alreaready exist or not if not exist registering user detailes
 * @param  -req,call - it contains the req and callback json file
 * @return json respond messege- data or error
 */
exports.Register = (req, call) => {
    register.findOne({
        "email": req.body.email
    }, (err, data) => {
        if (data) call("user exists");
        else {
            emailExistence.check(req.body.email, (error, response) => {
                if (!response) call("entered email id not exist, pls check once");
                else {
                    dcrypt.hash(req.body.password, 10, (err, encrypted) => {
                        var userDetailes = new register({
                            "firstName": req.body.firstName,
                            "lastName": req.body.lastName,
                            "email": req.body.email,
                            "password": encrypted
                        })
                        userDetailes.save((err, data) => {
                            if (err) call(err);
                            else {
                                util.sendEmail(req.body.email, "registration", "welcome to chatapp", (error, info) => {
                                    if (error) call(error)
                                    else {
                                        call(null, data);
                                    }
                                })
                            }
                        })
                    })
                }
            })
        }
    })
}

/**
 * @desc user login 
 * @param  -req,call - it contains the req and respond json file
 * @return json respond messege- data or error
 */
exports.Login = (req, call) => {
    register.findOne({
        "email": req.body.email
    }, (err, data) => {
        if (data) {
            dcrypt.compare(req.body.password, data.password, (err, sucess) => {
                if (sucess) call("login success");
                else call("password does not match");
            })
        } else call("email doesn't exists");
    })
}

/**
 * @desc findmail will find email and returns the data
 * @param  -req,call - it contains the req and respond json file
 * @return json respond messege- data or error
 */
exports.Findmail = (req, call) => {
    register.findOne({
        "email": req.body.email
    }, (err, data) => {
        if (data) call(null, data);
        else call("email doesn't exists");
    })
}

/**
 * @desc reset password and validating the detailes
 * @param  -req,res - it contains the req and respond json file
 * @return json respond messege- data or error
 */
exports.resetPassword = (req, call) => {
    dcrypt.hash(req.body.password, 10, (err, encrypted) => {
        register.updateMany({
            "_id": req.decoded._id
        }, {
            password: encrypted
        }, (err, data) => {
            if (err) call("error")
            else call("updated successfully");
        })
    })
}