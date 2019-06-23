const router = require('express').Router({
    mergeParams: true,
});
const path = require('path');
const teacher = require(path.resolve(__dirname, 'teacher.routes'));
const apiController = require(path.resolve(__dirname, '..', 'controllers', 'api.controller'));
const slideController = require(path.resolve(__dirname, '..', 'controllers', 'slide.controller'));
const middleware = require(path.resolve(__dirname, '..', 'middlewares', 'auth.middleware'));

router.use('/teacher', middleware.verify, teacher);

router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'submodules', 'students', 'dist', 'index.html'));
});
router.get('/qr', apiController.qr);
router.get('/share-url', apiController.shareUrl);
router.get('/slide/:imgName', slideController.getSlide);


module.exports = router;
