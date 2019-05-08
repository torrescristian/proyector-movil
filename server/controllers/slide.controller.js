const httpContext = require('express-http-context');
const path = require('path');
const fs = require('fs');

const fileService = require('../services/file.service');
const projectPath = path.resolve(__dirname, '..', '..', 'project');

module.exports = {
  getSlide(req, res) {
    const imgName = req.params.imgName;
    const imgPath = path.resolve(projectPath, imgName);
    if (!fs.existsSync(imgPath)) {
      res.sendStatus(404);
    }
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
    fileService.removeFile(imgPath);
    res.sendStatus(200);
  },
  updateSlide(req, res) {},
};
