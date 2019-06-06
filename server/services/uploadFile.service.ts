import multer from 'multer';
import { Request } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';
const fileService = require('./file.service');
const httpContext = require('express-http-context');

export class UploadFileService {
  uploadProject(): RequestHandler {
    const fileName = 'proyecto.zip';
    const destinationPath = resolve(__dirname, '..', '..', 'project');
    const upload = multer({
      limits: {
        fieldNameSize: 10000,
        fieldSize: 200,
      },
      storage: multer.diskStorage({
        destination: function(req, file, cb) {
          cb(null, destinationPath);
        },
        filename: function(req: Request, file: Express.Multer.File, cb) {
          existsSync(destinationPath) || mkdirSync(destinationPath);
          fileService.removeFileSync(`${destinationPath}/${fileName}`);
          cb(null, fileName);
        },
      }),
    });
    return upload.single('project');
  };

  uploadSlide() {
    const basepath = resolve(__dirname, '..', '..', 'project');
    const destinationPath = resolve(__dirname, '..', '..', 'project', 'proyecto');
    const upload = multer({
      limits: {
        fieldNameSize: 10000,
        fieldSize: 10,
      },
      storage: multer.diskStorage({
        destination: function(req, file, cb) {
          existsSync(basepath) || mkdirSync(basepath);
          existsSync(destinationPath) || mkdirSync(destinationPath);
          cb(null, destinationPath);
        },
        filename: function(req, file, cb) {
          const fileName = `${Date.now()}_${file.originalname}`;
          httpContext.set('filename', fileName);
          cb(null, fileName);
        },
      }),
    });
    return upload.single('slide');
  };
};