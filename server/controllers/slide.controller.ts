import { Request, Response } from 'express';
import { get } from 'express-http-context';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { FileService } from '../services/file.service';

export class SlideController {
  fileService: FileService;
  projectPath: string;

  constructor() {
    this.fileService = new FileService();
    this.projectPath = resolve(__dirname, '..', '..', 'project', 'proyecto');
  }

  getSlide(req: Request, res: Response) {
    const imgName = req.params.imgName;
    const imgPath = resolve(this.projectPath, imgName);
    existsSync(imgPath) || res.sendStatus(404);
    res.sendFile(imgPath);
  };

  insertSlide(req: Request, res: Response) {
    return res.json({
      filename: get('filename'),
    });
  };

  removeSlide(req: Request, res: Response) {
    const imgName = req.params.imgName;
    const imgPath = resolve(this.projectPath, imgName);
    if (!existsSync(imgPath)) {
      res.sendStatus(404);
    }
    this.fileService.removeFile(imgPath);
    res.sendStatus(200);
  };
};
