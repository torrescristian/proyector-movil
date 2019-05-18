const fs = require('fs');

module.exports = {
  removeFileSync(filepath) {
    fs.existsSync(filepath) && fs.unlinkSync(filepath);
  },

  removeFolderSync(folderpath) {
    const fsExtra = require('fs-extra');
    fs.existsSync(folderpath) && fsExtra.removeSync(folderpath);
  },

  writeFileSync({ data, folderpath, filename }) {
    fs.existsSync(folderpath) || fs.mkdirSync(folderpath);
    fs.writeFileSync(`${folderpath}/${filename}`, data);
  },

  existsSync(filepath) {
    return fs.existsSync(filepath);
  },
  
  zip({ folderpath, destinationFilePath }) {
    this.removeFileSync(destinationFilePath);

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
