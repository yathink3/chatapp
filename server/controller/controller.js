//importing paths
const userService = require('../service/service');
const util = require('../utility')

 /**
  * @desc register the user detailes and validating the detailes
  * @param  -req,res - it contains the req and respond json file
  * @return json respond messege- data or error
*/
exports.register = (req, res) => {
    console.log("data register");
    req.checkBody('firstName', 'Invalid first name').notEmpty().isAlpha();
    req.checkBody('lastName', 'Invalid last name').notEmpty().isAlpha();
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid possword').notEmpty().len(8, 30);
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
        response.error = errors;
        response.success = false;
        return res.status(422).send(response);
    } else {
        userService.register(req, (err, data) => {
            if (err) res.status(404).send(err);
            else res.status(200).send(data);
        })
    }
}

/**
  * @desc login user  and validating the detailes
  * @param  -req,res - it contains the req and respond json file
  * @return json respond messege- data or error
*/
exports.login = (req, res) => {
    console.log("login on go");
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid possword').notEmpty().len(8, 30);
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
        response.error = errors;
        response.success = false;
        return res.status(422).send(response);
    } else {
        userService.login(req, (err, data) => {
            if (err) res.status(404).send(err);
            else res.status(200).send(data);
        })
    }
}

/**
  * @desc forgot user password and validating the detailes
  * @param  -req,res - it contains the req and respond json file
  * @return json respond messege- data or error
*/
exports.forgot = (req, res) => {
    console.log("forgot on go");
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
        response.error = errors;
        response.success = false;
        return res.status(422).send(response);
    } else {
        userService.findmail(req, (err, data) => {

            if (err) res.status(404).send(err);
            else {
                response.success = true;
                response.data = data;
                const payload = {
                    user_id: response.data._id
                }
                const url = process.env.URL+'forgot/' + util.getRandomToken(payload).token;
                res.status(200).send(url);
                util.sendEmail(response.data.email,'mail verification','verification link:\n' + url) 
            }
        })
    }
}
/**
  * @desc reset user password and validating the detailes
  * @param  -req,res - it contains the req and respond json file
  * @return json respond messege- data or error
*/
exports.resetPassword = (req, res) => {
    console.log("reset on go");
    req.checkBody('password', 'Invalid possword').notEmpty().len(8, 30);
    req.checkBody('confirmPassword', 'Invalid possword').notEmpty().len(8, 30);
    var errors = req.validationErrors();
    if (req.body.password != req.body.confirmPassword)
        var errors = "password mismatch";
    var response = {};
    if (errors) {
        response.error = errors;
        response.success = false;
        return res.status(422).send(response);
    } else {
        userService.resetPassword(req, (err, data) => {
            if (err) res.status(404).send(err);
            else {
                res.status(200).send(data);
            }
        })
    }

}