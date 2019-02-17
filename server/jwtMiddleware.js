const jwtAuth = require('./jwt-auth');
var jwtMiddleware = function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['authorization'];
    var uOptions = req.headers['user-options'];
    uOptions = JSON.parse(uOptions)
    if (token) {
      var a = jwtAuth.verify(token, uOptions);
      if (!a) {
        return res.json({
          success: false,
          message: 'Token: Not Valid'
        });
      } else {
        res.a = a;
        next()
      }
    } else {
      return res.json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
};
module.exports = jwtMiddleware;