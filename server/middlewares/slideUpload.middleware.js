const path = require('path');
const uploadFileService = require(path.resolve(__dirname, '..', 'services', 'uploadFile.service'));

module.exports = uploadFileService.uploadSlide();
