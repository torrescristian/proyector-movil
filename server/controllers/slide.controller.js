const httpContext = require('express-http-context');
const path = require('path');
const fs = require('fs');

const fileService = require(path.resolve(__dirname, '..', 'services', 'file.service'));
const projectPath = path.resolve(__dirname, '..', '..', 'project', 'proyecto');

module.exports = {
  getSlide(req, res) {
    const imgName = req.params.imgName;
    const imgPath = path.resolve(projectPath, imgName);
    fs.existsSync(imgPath) || res.sendStatus(404);
    res.sendFile(imgPath);
  },
  insertSlide(req, res) {
    return res.json({
      filename: httpContext.get('filename'),
    });
  },
  removeSlide(req, res) {
    const imgName = req.params.imgName;
    const imgPath = path.resolve(projectPath, imgName);
    if (!fs.existsSync(imgPath)) {
      res.sendStatus(404);
    }
    fileService.removeFileSync(imgPath);
    res.sendStatus(200);
  },
};
