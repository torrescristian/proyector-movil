// @ts-check
const fs = require('fs');

module.exports = {
  /**
   * @param {string} filepath 
   * @returns {void}
   */
  removeFileSync(filepath) {
    fs.existsSync(filepath) && fs.unlinkSync(filepath);
  },

  /**
   * @param {string} folderpath 
   * @returns {void}
   */
  removeFolderSync(folderpath) {
    const fsExtra = require('fs-extra');
    fs.existsSync(folderpath) && fsExtra.removeSync(folderpath);
  },

  /**
   * @param {{
   *  data: string[],
   *  folderpath: string,
   * }} options
   * @returns {void}
   */
  removeNonIndexedSlides({ data, folderpath }) {
    const files = fs.readdirSync(folderpath);
    data.push('data.json');
    const filesToRemove = files.filter((fileName) => !data.includes(fileName));
    filesToRemove.map(file => {
      fs.unlinkSync(`${folderpath}/${file}`);
    });
  },

  /**
   * @param {{
   *  data: string,
   *  folderpath: string,
   *  filename: string,
   * }} options
   * @returns {void}
   */
   writeFileSync({ data, folderpath, filename }) {
    fs.existsSync(folderpath) || fs.mkdirSync(folderpath);
    fs.writeFileSync(`${folderpath}/${filename}`, data);
  },

  /**
   * @param {string} filepath
   * @returns {boolean} 
   */
  existsSync(filepath) {
    return fs.existsSync(filepath);
  },

  /**
   * @param {{
   *  folderpath: string,
   *  destinationFilePath: string,
   * }} options
   * @returns {Promise<any>}
   */
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

  /**
   * @param {{
   *   filepath: string,
   *   destination: string,
   * }} options
   * @returns {Promise<decompress.File[]>}
   */
  unzip({ filepath, destination }) {
    const decompress = require('decompress');
    const decompressUnzip = require('decompress-unzip');

    return decompress(filepath, destination, {
      plugins: [decompressUnzip()],
    });
  },
};
