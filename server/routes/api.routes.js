const router = require('express').Router();
const path = require('path');
const teacher = require(path.resolve(__dirname, 'teacher.routes'));
const common = require(path.resolve(__dirname, 'common.routes'));
const middleware = require(path.resolve(__dirname, '..', 'middlewares', 'auth.middleware'));

router.use('/teacher', middleware.verify, teacher);
router.use('/', common);

module.exports = router;
