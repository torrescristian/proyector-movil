const multer = require('multer');
const fs = require('fs');
const fileService = require('./file.service');

module.exports = {
  uploadProject({ fileName, destinationPath }) {
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
  uploadSlide({ fileName, destinationPath }) {
    const destinationPath = `${__dirname}/../../project`;
    const upload = multer({
      storage: multer.diskStorage({
        destination: function(req, file, cb) {
          cb(null, destinationPath);
        },
        filename: function(req, file, cb) {
          fs.existsSync(destinationPath) || fs.mkdirSync(destinationPath);
          cb(null, `${Date.now()}_${file.originalname}`);
        },
      }),
    });
    return upload.single('slide');
  },
};
