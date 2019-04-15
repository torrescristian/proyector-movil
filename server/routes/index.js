const router = require('express').Router();
const api = require('./api.routes');

router.use('/api', api);

module.exports = router;