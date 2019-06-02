const fileService = require('../services/file.service');
const path = require('path');
const fs = require('fs');

const zipFilePath = path.join(__dirname, '/../../project/proyecto.zip');
const proyectoPath = path.join(__dirname, '/../../project/proyecto');

module.exports = {
  async import(req, res) {
    fileService.removeFolderSync(proyectoPath);

    await fileService.unzip({
      filepath: zipFilePath,
      destination: proyectoPath,
    });

    const data = JSON.parse(fs.readFileSync(path.join(proyectoPath, 'data.json')));
    res.json(data);
  },
  async export(req, res) {
    const folderpath = proyectoPath;

    fileService.writeFileSync({
      data: JSON.stringify(req.body.database),
      folderpath,
      filename: 'data.json',
    });

    await fileService.zip({
      folderpath,
      destinationFilePath: zipFilePath,
    });

    res.sendStatus(200);
  },
  download(req, res) {
    const filepath = zipFilePath;
    if (fileService.existsSync(filepath)) {
      res.download(filepath, `proyecto_${Date.now()}.zip`);
    } else {
      res.sendStatus(404);
    }
  },
};
