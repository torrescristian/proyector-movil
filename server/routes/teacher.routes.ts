import { TeacherController } from '../controllers/teacher.controller';
import { SlideController } from '../controllers/slide.controller';
import { importMiddleware } from '../middlewares/import.middleware';
import { slideUploadMiddleware } from '../middlewares/slideUpload.middleware';

const teacherController = new TeacherController();
const slideController = new SlideController();
const router = require('express').Router({
  mergeParams: true,
});

router.post('/import', importMiddleware, teacherController.import);
router.post('/export', teacherController.export);
router.get('/export', teacherController.download);
router.post('/slide', slideUploadMiddleware, slideController.insertSlide);
router.delete('/slide/:imgName', slideController.removeSlide);

export const teacherRouter = router;
