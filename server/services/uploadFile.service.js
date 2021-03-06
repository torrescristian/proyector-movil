const multer = require('multer');
const fs = require('fs');
const fileService = require('./file.service');
const httpContext = require('express-http-context');
const path = require('path');

module.exports = {

  /**
   * @returns {Express.Multer.File}
   */
  uploadProject() {
    const fileName = 'proyecto.zip';
    const destinationPath = path.resolve(__dirname, '..', '..', 'project');
    const upload = multer({
      limits: {
        fieldNameSize: 10000,
        fieldSize: 200,
      },
      storage: multer.diskStorage({
        destination: function(req, file, cb) {
          cb(null, destinationPath);
        },
        filename: function(req, file, cb) {
          fs.existsSync(destinationPath) || fs.mkdirSync(destinationPath);
          fileService.removeFileSync(`${destinationPath}/${fileName}`);
          cb(null, fileName);
        },
      }),
    });
    return upload.single('project');
  },

  /**
   * @returns {Express.Multer.File}
   */
  uploadSlide() {
    const basepath = path.resolve(__dirname, '..', '..', 'project');
    const destinationPath = path.resolve(__dirname, '..', '..', 'project', 'proyecto');
    const upload = multer({
      limits: {
        fieldNameSize: 10000,
        fieldSize: 10,
      },
      storage: multer.diskStorage({
        destination: function(req, file, cb) {
          fs.existsSync(basepath) || fs.mkdirSync(basepath);
          fs.existsSync(destinationPath) || fs.mkdirSync(destinationPath);
          cb(null, destinationPath);
        },
        filename: function(req, file, cb) {
          const fileName = `${Date.now()}_${file.originalname}`;
          httpContext.set('filename', fileName);
          cb(null, fileName);
        },
      }),
    });
    return upload.single('slide');
  },

};
