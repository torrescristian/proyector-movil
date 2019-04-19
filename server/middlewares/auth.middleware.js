const service = require('../services/login.service');

module.exports = {
  verify(req, res, next) {
    const { authorization = '' } = req.headers;
    const token = authorization.replace('Bearer ', '');
    if (!service.tokenIsValid(token)) {
      return res.status(403).json('Auth required');
    }
    next();
  },
};
