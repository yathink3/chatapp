var model = require('../app/model/model');
exports.register = (req, call) => {
    model.Register(req, (err, data) => {
        if (err) call(err);
        else call(null, data);
    })
}