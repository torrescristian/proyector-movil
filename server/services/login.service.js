const jwt = require('jsonwebtoken');
const timestamp = require(`${__dirname}/../../config/timestamp.json`);

function isARegisteredUser({ email, password }) {
  const user = require(`${__dirname}/../../config/user.json`);
  return email === user.email && password === user.password;
}

module.exports = {
  /**
   * @returns {string}
   * @param {object} options
   */
  create(options) {
    const { name, email } = options;
    if (!isARegisteredUser(options)) {
      const err = new Error(
        'There is not user with that email or password'
      );
      err.code = '400';
      throw err;
    }
    
    return jwt.sign({ name, email }, timestamp, {
      expiresIn: '2d',
    });
  },

  /**
   * @returns {boolean}
   * @param {string} token
   */
  tokenIsValid(token) {
    const decoded = jwt.verify(token, timestamp);
    const current_time = Date.now() / 1000;
    return decoded.exp && decoded.exp > current_time;
  },
};
