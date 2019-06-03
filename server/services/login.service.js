const jwt = require('jsonwebtoken');
const path = require('path');

module.exports = {
  /**
   * @returns {string}
   */
  create() {
    const name = 'admin';
    const email = 'admin@admin.com';
    const timestamp = require(path.resolve(__dirname, '..', '..', 'config', 'timestamp.json'));

    return jwt.sign({ name, email }, timestamp, {
      expiresIn: '2d',
    });
  },

  /**
   * @returns {boolean}
   * @param {string} token
   */
  tokenIsValid(token) {
    const timestamp = require(path.resolve(__dirname, '..', '..', 'config', 'timestamp.json'));
    const decoded = jwt.verify(token, timestamp);
    const current_time = Date.now() / 1000;
    return decoded.exp && decoded.exp > current_time;
  },

  saveTimestamp() {
    const fs = require('fs');
    const filepath = path.resolve(__dirname, '..', '..', 'config', 'timestamp.json');
    const date = JSON.stringify(String(Date.now()));
    fs.writeFileSync(filepath, date);
  },
};
