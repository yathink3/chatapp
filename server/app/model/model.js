const mongoose = require('mongoose');
const dcrypt = require('bcryptjs');
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
var register = mongoose.model('user', userData);
exports.Register = (req, call) => {
    register.findOne({
        "email": req.body.email
    }, (err, data) => {
        if (data) call("user exists");
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
                    else call(null, data);
                })
            })
        }
    })
}
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
exports.Findmail = (req, call) => {
    register.findOne({
        "email": req.body.email
    }, (err, data) => {
        if (data) call(null, data);
        else call("email doesn't exists");
    })
}
exports.resetPassword = (req, call) => {
    dcrypt.hash(req.body.password, 10, (err, encrypted) => {
        register.update({
            "_id": req.decoded._id
        }, {
            password: encrypted
        }, (err, data) => {
            if (err) call("error")
            else call("updated successfully");
        })
    })
}