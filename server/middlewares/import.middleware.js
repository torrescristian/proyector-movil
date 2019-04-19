const multer = require('multer');
const fs = require('fs');

const basepath = `${__dirname}/../../project`;
const fileService = require('../services/file.service');
const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, basepath);
    },

    filename: function(req, file, cb) {
      if (file.originalname !== 'proyecto.zip') {
        throw new Error('Formato de archivo inválido');
      }

      fs.existsSync(basepath) || fs.mkdirSync(basepath);

      fileService.removeFile(`${basepath}/proyecto.zip`);

      cb(null, 'proyecto.zip');
    },
  }),
});

module.exports = upload.single('project');
