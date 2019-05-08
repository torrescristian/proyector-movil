const httpContext = require('express-http-context');
const path = require('path');

module.exports = {
  getSlide(req, res) {
    const imgName = req.params.imgName;
    console.log(imgName);
    res.sendfile(path.resolve(__dirname, '..', '..', 'project', imgName));
  },
  insertSlide(req, res) {
    return res.json({
      filename: httpContext.get('filename'),
    });
  },
  removeSlide(req, res) {},
  updateSlide(req, res) {},
};
