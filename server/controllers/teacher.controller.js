const basepath = `${__dirname}/../../project`;
const fileService = require('../services/file.service');
const path = require('path');

module.exports = {
  home(req, res) {
    res.sendStatus(200);
  },
  import(req, res) {
    fileService.removeFolderSync(`${basepath}/proyecto`);

    fileService.unzip({
      filepath: `${basepath}/proyecto.zip`,
      destination: `${basepath}/proyecto`,
    });

    res.sendStatus(200);
  },
  async export(req, res) {
    const folderpath = `${basepath}/proyecto`;

    fileService.writeFileSync({
      data: JSON.stringify(req.body.database),
      folderpath,
      filename: 'data.json',
    });

    await fileService.zip({
      folderpath,
      destinationFilePath: `${basepath}/proyecto.zip`,
    });
    
    res.sendStatus(200);
  },
  download(req, res) {
    const filepath = path.resolve(basepath, 'proyecto.zip');
    if (fileService.existsSync(filepath)) {
      res.download(filepath);
    } else {
      res.sendStatus(404);
    }
  },
};
