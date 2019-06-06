import { UploadFileService } from '../services/uploadFile.service';
const uploadFileService = new UploadFileService();

export const importMiddleware = uploadFileService.uploadProject();
