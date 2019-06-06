import { Router, Request, Response } from 'express';
import { resolve } from 'path';
import { CommonController } from '../controllers/common.controller';
import { SlideController } from '../controllers/slide.controller';

const commonController = new CommonController();
const slideController = new SlideController();
const router = Router({
  mergeParams: true,
});

router.get('/', (req: Request, res: Response) => {
  res.sendFile(resolve(__dirname, '..', '..', 'builded-client', 'students', 'index.html'));
});
router.get('/profesor', (req: Request, res: Response) => {
  res.sendFile(resolve(__dirname, '..', '..', 'builded-client', 'teacher', 'index.html'));
});
router.get('/qr', commonController.qr);
router.get('/share-url', commonController.shareUrl);
router.get('/slide/:imgName', slideController.getSlide);

export const commonRouter = router;
