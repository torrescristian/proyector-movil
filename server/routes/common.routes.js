const router = require('express').Router();
const commonController = require('../controllers/common.controller');
const slideController = require('../controllers/slide.controller');

router.get('/qr', commonController.qr);
router.post('/login', commonController.login);
router.get('/slide/:id', slideController.getSlide);

module.exports = router;
