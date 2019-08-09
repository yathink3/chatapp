//importing required modules
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

/**
 * @descr it will generate random tokens by by encrypting secretekey with payload
 * @param  -payload ,payload is considered as user_id
 * @return returning encrypted obj
 */
exports.getRandomToken = (payload) => {
    const obj = {
        success: true,
        token: jwt.sign({
            payload
        }, process.env.JWT_SECRET, {
            expiresIn: '2h'
        })
    }
    return obj;
}

/**
 * @desc it varify the token clicked same as user token or not by using secretkey
 * @param  -req,rs,next - it is a middleware 
 * @return returning if decrypted key matched  next callback else res callback
 */
exports.varify = (req, res, next) => {
    console.log("varify");
    var token = req.params.token;
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) res.status(422).send(err)
        else {
            req.decoded = payload;
            next();
        }
    })
}

/**
 * @desc it will send email to the specified person
 * @param  -req,call - it contains the req and callback function
 * @return returning back to the model and checking  data or error
 */
exports.sendEmail = (email, subject, text, call) => {
    console.log("sending mail")
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    })
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        text: text
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            call(err);
            console.log("message not sent", err);
        } else {
            call(null, info);
            console.log("messege sent", info)
        }
    })
}