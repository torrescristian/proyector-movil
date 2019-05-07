const jwt = require('jsonwebtoken');
const config = require('config');

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
    const timestampFileName = config.get('timestampFileName');
    const timestamp = require(`${__dirname}/../../config/${timestampFileName}.json`);

    if (!isARegisteredUser(options)) {
      const err = new Error('There is not user with that email or password');
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
    const timestampFileName = config.get('timestampFileName');
    const timestamp = require(`${__dirname}/../../config/${timestampFileName}.json`);
    const decoded = jwt.verify(token, timestamp);
    const current_time = Date.now() / 1000;
    return decoded.exp && decoded.exp > current_time;
  },

  saveTimestamp() {
    const fs = require('fs');
    const filepath = `${__dirname}/../../config/timestamp.json`;
    const date = JSON.stringify(String(Date.now()));
    fs.writeFileSync(filepath, date);
  },
};
