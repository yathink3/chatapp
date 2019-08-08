var model = require('../app/model/model');
exports.register = (req, call) => {
    model.Register(req, (err, data) => {
        if (err) call(err);
        else call(null, data);
    })
}
exports.login = (req, call) => {
    model.Login(req, (err, data) => {
        if (err) call(err);
        else call(null, data);
    })
}
exports.findmail = (req, call) => {
    model.Findmail(req, (err, data) => {
        if (err) call(err);
        else call(null, data);
    })
}
exports.resetPassword = (req, call) => {
    model.resetPassword(req, (err, data) => {
        if (err) call(err);
        else call(null, data);
    })
}