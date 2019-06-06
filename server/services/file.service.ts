import { existsSync, unlinkSync, mkdirSync, writeFileSync, createWriteStream } from 'fs';
import { removeSync } from 'fs-extra';

export class FileService {
  removeFile(filepath: string): void {
    existsSync(filepath) && unlinkSync(filepath);
  };

  removeFolder(folderpath: string): void {
    existsSync(folderpath) && removeSync(folderpath);
  };

  writeFile({ data, folderpath, filename }: { data: string, folderpath: string, filename: string }): void {
    existsSync(folderpath) || mkdirSync(folderpath);
    writeFileSync(`${folderpath}/${filename}`, data);
  };

  exists(filepath: string): boolean {
    return existsSync(filepath);
  };

  zip({ folderpath, destinationFilePath }: { folderpath: string, destinationFilePath: string }): Promise<any> {
    this.removeFile(destinationFilePath);
    
    const archiver = require('archiver');
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Sets the compression level.
    });
    archive.directory(folderpath, false);
    const output = createWriteStream(destinationFilePath);
    archive.pipe(output);
    archive.finalize();
    return new Promise((resolve, reject) => {
      output.on('close', () => {
        resolve();
      });
    });
  };

  unzip({ filepath, destination }: { filepath: string, destination: string }): Promise<any> {
    const decompress = require('decompress');
    const decompressUnzip = require('decompress-unzip');
    
    return decompress(filepath, destination, {
      plugins: [decompressUnzip()],
    });
  };
}