const router = require('express').Router();
const api = require('./api.routes');
const path = require('path');

router.use('/api', api);
router.get('/profesor', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'builded-client', 'teacher', 'index.html'));
});

module.exports = router;