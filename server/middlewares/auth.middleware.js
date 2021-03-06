const path = require('path');
const service = require(path.resolve(__dirname, '..', 'services', 'login.service'));

module.exports = {
  /**
   * 
   * @param {Express.Request} req 
   * @param {Express.Response} res 
   * @param {Function} next 
   */
  verify(req, res, next) {
    const { authorization = '' } = req.headers;
    const bearerToken = authorization.replace('Bearer ', '');
    const queryToken = req.query.token;
    if (
      (bearerToken || queryToken)
      && !service.tokenIsValid(bearerToken || queryToken)
    ) {
      return res.status(403).json('Auth required');
    }
    next();
  },
};
