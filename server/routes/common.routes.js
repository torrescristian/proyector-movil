const router = require('express').Router({
  mergeParams: true,
});
const commonController = require('../controllers/common.controller');
const slideController = require('../controllers/slide.controller');

router.get('/qr', commonController.qr);
router.post('/login', commonController.login);
router.get('/slide/:imgName', slideController.getSlide);

module.exports = router;
