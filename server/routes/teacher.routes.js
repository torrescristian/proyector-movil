const router = require('express').Router();
const teacherController = require('../controllers/teacher.controller');
const slideController = require('../controllers/slide.controller');
const middleware = require('../middlewares/import.middleware');

router.get('/home', teacherController.home);
router.post('/import', middleware, teacherController.import);
router.get('/export', teacherController.export);
router.post('/slide', slideController.insertSlide);
router.put('/slide/:id', slideController.updateSlide);
router.delete('/slide/:id', slideController.removeSlide);

module.exports = router;
