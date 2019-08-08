const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

exports.getRandomTokenUrl = (payload) => {
    const obj = {
        success: true,
        token: jwt.sign({
            payload
        }, 'secretkey', {
            expiresIn: '2h'
        })
    }
    return 'http://localhost:3000/forgot/' + obj.token;
}
exports.varify = (req, res, next) => {
    console.log("varify");
    var token = req.params.token;
    jwt.verify(token, 'secretkey', (err, payload) => {
        if (err) res.status(422).send(err)
        else {
            req.decoded = payload;
            next();
        }
    })
}
exports.sendEmail = (url, email) => {
    console.log("sending mail")
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'manoj.mk.24.mk@gmail.com',
            pass: '123manoj24$'
        }
    })
    const mailOptions = {
        from: 'manoj.mk.24.mk@gmail.com',
        to: email,
        subject: 'node.js send mail',
        text: 'verification link:\n' + url
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log("message not sent", err)
        else console.log("messege sent", info)
    })
}