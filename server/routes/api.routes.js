const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({
    hola: 'mundo',
  });
});

module.exports = router;