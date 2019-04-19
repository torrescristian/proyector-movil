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

  login(req, res) {
    const joi = require('joi');
    const schema = require('../schemas/common.controller.login.schema');

    const result = joi.validate(req.body, schema);

    if (result.error) {
      return res.status(400).json(result.error);
    }

    const token = service.create(req.body);
    res.json({ token });
  },
};
