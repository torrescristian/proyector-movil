const fs = require('fs');

module.exports = {
  removeFile(filepath) {
    fs.existsSync(filepath) && fs.unlinkSync(filepath);
  },

  removeFolder(folderpath) {
    const fsExtra = require('fs-extra');
    fs.existsSync(folderpath) && fsExtra.removeSync(folderpath);
  },

  zip({ folderpath, destinationFilePath }) {
    this.removeFile(destinationFilePath);

    const archiver = require('archiver');
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Sets the compression level.
    });
    archive.directory(folderpath, false);
    const output = fs.createWriteStream(destinationFilePath);
    archive.pipe(output);
    archive.finalize();
    return new Promise((resolve, reject) => {
      output.on('close', () => {
        resolve();
      });
    });
  },

  unzip({ filepath, destination }) {
    const unzip = require('unzip');
    fs.createReadStream(filepath).pipe(unzip.Extract({ path: destination }));
  },
};
