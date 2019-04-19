const router = require('express').Router();
const teacher = require('./teacher.routes');
const common = require('./common.routes');
const middleware = require('../middlewares/auth.middleware');

router.use('/teacher', middleware.verify, teacher);
router.use('/', common);

module.exports = router;
