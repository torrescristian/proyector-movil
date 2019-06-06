const router = require('express').Router();
const api = require('./api.routes');
const path = require('path');

router.use('/api', api);
router.get('/profesor', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'submodules', 'proyector-movil-teacher', 'dist', 'index.html'));
});

module.exports = router;