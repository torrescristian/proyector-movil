const qr = require('qr-image');
const path = require('path');
const ipService = require(path.resolve(__dirname, '..', 'services', 'ip.service'));

module.exports = {
  qr(req, res) {
    const url = `http://${ipService.getIPAddress()}:3000`;

    const qr_svg = qr.image(url, {
      type: 'png',
      size: 10,
    });

    qr_svg.pipe(res);
  },

  shareUrl(req, res) {
    return res.json({
      url: `http://${ipService.getIPAddress()}:3000`,
    });
  }
};
