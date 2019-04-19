const router = require('express').Router();
const controller = require('../controllers/common.controller');

router.get('/qr', controller.qr);
router.post('/login', controller.login);

module.exports = router;
