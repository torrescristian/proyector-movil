const router = require('express').Router();
const teacher = require('./teacher.routes');
const common = require('./common.routes');

router.use('/teacher', teacher);
router.use('/', common);

module.exports = router;
