const multer = require('multer');
const fs = require('fs');
const fileService = require('./file.service');
const httpContext = require('express-http-context');

module.exports = {
  uploadProject() {
    const fileName = 'proyecto.zip';
    const destinationPath = `${__dirname}/../../project`;
    const upload = multer({
      storage: multer.diskStorage({
        destination: function(req, file, cb) {
          if (file.originalname !== fileName) {
            throw new Error('Formato de archivo inválido');
          }
          cb(null, destinationPath);
        },
        filename: function(req, file, cb) {
          fs.existsSync(destinationPath) || fs.mkdirSync(destinationPath);
          fileService.removeFile(`${destinationPath}/${fileName}`);
          cb(null, fileName);
        },
      }),
    });
    return upload.single('project');
  },
  uploadSlide() {
    const destinationPath = `${__dirname}/../../project`;
    const upload = multer({
      storage: multer.diskStorage({
        destination: function(req, file, cb) {
          cb(null, destinationPath);
        },
        filename: function(req, file, cb) {
          fs.existsSync(destinationPath) || fs.mkdirSync(destinationPath);
          const fileName = encodeURIComponent(
            `${Date.now()}_${file.originalname}`
          );
          httpContext.set('filename', fileName);
          cb(null, fileName);
        },
      }),
    });
    return upload.single('slide');
  },
};
