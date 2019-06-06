const router = require('express').Router({
  mergeParams: true,
});
const path = require('path');
const commonController = require(path.resolve(__dirname, '..', 'controllers', 'common.controller'));
const slideController = require(path.resolve(__dirname, '..', 'controllers', 'slide.controller'));

router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'submodules', 'proyector-movil-students', 'dist', 'index.html'));
});
router.get('/profesor', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'submodules', 'proyector-movil-teacher', 'dist', 'index.html'));
});
router.get('/qr', commonController.qr);
router.get('/share-url', commonController.shareUrl);
router.get('/slide/:imgName', slideController.getSlide);

module.exports = router;
