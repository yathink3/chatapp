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
    console.log("tgdrfhg");
    register.save((err, data) => {
        if (err) call(err);
        else call(null, data);
    })

}

// console.log("this is model");
//     register.findOne({
//         "email": req.body.email
//     }, (err, data) => {
//         if (data) call("user exists");
//         else {
//             dcrypt.hash(req.body.password, 10, (err, encrypted) => {
//                 var userDetailes = new register({
//                     "firstName": req.body.firstName,
//                     "lastName": req.body.lastName,
//                     "email": req.body.email,
//                     "password": encrypted
//                 })
//                 userDetailes.save((err, data) => {
//                     if (err) call(err);
//                     else call(null, data);
//                 })
//             })
//         }
//     })