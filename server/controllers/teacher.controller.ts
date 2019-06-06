import { Request, Response } from 'express';
import { resolve } from 'path';
import { FileService } from '../services/file.service';

export class TeacherController {
  fileService: FileService;
  zipFilePath: string;
  proyectoPath: string;

  constructor() {
    this.fileService = new FileService();
    this.zipFilePath = resolve(__dirname, '..', '..', 'project', 'proyecto.zip');
    this.proyectoPath = resolve(__dirname, '..', '..', 'project', 'proyecto');
  }

  async import(req: Request, res: Response) {
    this.fileService.removeFolder(this.proyectoPath);

    await this.fileService.unzip({
      filepath: this.zipFilePath,
      destination: this.proyectoPath,
    });

    const data = require(resolve(this.proyectoPath, 'data.json'));
    res.json(data);
  };

  async export(req: Request, res: Response) {
    const folderpath = this.proyectoPath;

    this.fileService.writeFile({
      data: JSON.stringify(req.body.database),
      folderpath,
      filename: 'data.json',
    });

    await this.fileService.zip({
      folderpath,
      destinationFilePath: this.zipFilePath,
    });

    res.sendStatus(200);
  };

  download(req: Request, res: Response) {
    const filepath = this.zipFilePath;
    if (this.fileService.exists(filepath)) {
      res.download(filepath, `proyecto_${Date.now()}.zip`);
    } else {
      res.sendStatus(404);
    }
  };
};
