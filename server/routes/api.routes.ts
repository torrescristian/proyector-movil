import { Router } from 'express';
import { teacherRouter } from './teacher.routes';
import { commonRouter } from './common.routes';
import { verify } from '../middlewares/auth.middleware';

const router = Router();

router.use('/teacher', verify, teacherRouter);
router.use('/', commonRouter);

export const apiRouter = router;
