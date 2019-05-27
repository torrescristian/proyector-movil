const qr = require('qr-image');
const ip = require('ip');
const service = require('../services/login.service');

module.exports = {
  qr(req, res) {
    const url = `http://${ip.address()}:3000`;

    const qr_svg = qr.image(url, {
      type: 'png',
      size: 10,
    });

    qr_svg.pipe(res);
  },

  shareUrl(req, res) {
    return res.json({
      url: `http://${ip.address()}:3000`,
    });
  }
};
