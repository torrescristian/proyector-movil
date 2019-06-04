const os = require('os');

module.exports = {
  getIPAddress() {
    const interfaces = os.networkInterfaces();
    const addresses = [];
    
    for (let k in interfaces) {
      for (let k2 in interfaces[k]) {
        const address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
          addresses.push(address.address);
        }
      }
    }

    const [ address192 ] = addresses.filter((address) => address.match(/^192\./));
    const [ address10 ] = addresses.filter((address) => address.match(/^10\./));
    const [ address172 ] = addresses.filter((address) => address.match(/^172\./));
    return address192 || address10 || address172;
  },
};
