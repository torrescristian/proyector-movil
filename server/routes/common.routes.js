const router = require('express').Router();
const controller = require('../controllers/common.controller');

router.get('/qr', controller.qr);

module.exports = router;
