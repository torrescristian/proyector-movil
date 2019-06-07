const router = require('express').Router();
const api = require('./api.routes');
const path = require('path');

router.use('/api', api);

module.exports = router;