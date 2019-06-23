const router = require('express').Router({
  mergeParams: true,
});
const path = require('path');
const teacherController = require(path.resolve(__dirname, '..', 'controllers', 'teacher.controller'));
const slideController = require(path.resolve(__dirname, '..', 'controllers', 'slide.controller'));
const importMiddleware = require(path.resolve(__dirname, '..', 'middlewares', 'import.middleware'));
const slideUploadMiddleware = require(path.resolve(__dirname, '..', 'middlewares', 'slideUpload.middleware'));

router.post('/import', importMiddleware, teacherController.import);
router.post('/export', teacherController.export);
router.get('/export', teacherController.download);
router.post('/slide', slideUploadMiddleware, slideController.insertSlide);
router.delete('/slide/:imgName', slideController.removeSlide);

module.exports = router;
