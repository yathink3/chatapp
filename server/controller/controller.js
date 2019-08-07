const userService = require('../service/service');
exports.register = (req, res) => {
    console.log("data entry");
    req.checkBody('firstName', 'Invalid first name').notEmpty().isAlpha();
    req.checkBody('lastName', 'Invalid last name').notEmpty().isAlpha();
    req.checkBody('email', 'Invalid email').notEmpty().isEmail().isUnique();
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