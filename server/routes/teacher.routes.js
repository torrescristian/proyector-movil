const router = require('express').Router();
const controller = require('../controllers/teacher.controller');
const middleware = require('../middlewares/import.middleware');

router.get('/home', controller.home);
router.post('/import', middleware, controller.import);
router.get('/export', controller.export);

module.exports = router;
