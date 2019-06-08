// @ts-check
const path = require('path');
const fileService = require(path.resolve(__dirname, '..', 'services', 'file.service'));
const fs = require('fs');

const zipFilePath = path.resolve(__dirname, '..', '..', 'project', 'proyecto.zip');
const proyectoPath = path.resolve(__dirname, '..', '..', 'project', 'proyecto');

module.exports = {
  async import(req, res) {
    fileService.removeFolderSync(proyectoPath);

    await fileService.unzip({
      filepath: zipFilePath,
      destination: proyectoPath,
    });

    const data = JSON.parse(fs.readFileSync(path.resolve(proyectoPath, 'data.json'), 'utf8'));
    res.json(data);
  },
  async export(req, res) {
    const folderpath = proyectoPath;
    /**
     * @type{Object}
     */
    const database = req.body.database;
    const data = JSON.stringify(database);
      
    fileService.writeFileSync({
      data,
      folderpath,
      filename: 'data.json',
    });

    fileService.removeNonIndexedSlides({
      data: Object.keys(database),
      folderpath,
    })

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
