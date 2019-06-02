const router = require('express').Router({
  mergeParams: true,
});
const teacherController = require('../controllers/teacher.controller');
const slideController = require('../controllers/slide.controller');
const importMiddleware = require('../middlewares/import.middleware');
const slideUploadMiddleware = require('../middlewares/slideUpload.middleware');

router.post('/import', importMiddleware, teacherController.import);
router.post('/export', teacherController.export);
router.get('/export', teacherController.download);
router.post('/slide', slideUploadMiddleware, slideController.insertSlide);
router.delete('/slide/:imgName', slideController.removeSlide);

module.exports = router;
