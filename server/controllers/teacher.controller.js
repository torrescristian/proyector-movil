const basepath = `${__dirname}/../../project`;
const fileService = require('../services/file.service');
const path = require('path');

module.exports = {
  home(req, res) {
    res.sendStatus(200);
  },
  import(req, res) {
    fileService.removeFolder(`${basepath}/proyecto`);

    fileService.unzip({
      filepath: `${basepath}/proyecto.zip`,
      destination: `${basepath}/proyecto`,
    });

    res.sendStatus(200);
  },
  async export(req, res) {
    await fileService.zip({
      folderpath: `${basepath}/proyecto`,
      destinationFilePath: `${basepath}/proyecto.zip`,
    });
    res.download(path.resolve(basepath, 'proyecto.zip'));
  },
};
