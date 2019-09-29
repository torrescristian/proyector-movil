const fileService = require('./file.service')
const fs = require('fs');

describe('file.services', () => {
  const filename = 'temp.txt';
  const folderpath = __dirname;
  const filepath = `${folderpath}/${filename}`;
  const fileExists = () => fileService.existsSync(filepath);
  const dirname = `${__dirname}/faketempdir`;
  const dirExists = () => fileService.existsSync(dirname);

  describe('existsSync method', () => {
    it('should give the same response than fs.existsSync', () => {            
      const fsExists = fs.existsSync('./file.services.js');
      const fileServiceExists = fileService.existsSync('./file.services.js');
      expect(fileServiceExists).toEqual(fsExists);

      const fsDontExists = fs.existsSync('./dont-exists.services.js');
      const fileServiceDontExists = fileService.existsSync('./dont-exists.services.js');
      expect(fileServiceDontExists).toEqual(fsDontExists);
    });
    fs.existsSync('./file.services.js');
  });
  describe('writeFileSync method', () => {
    it('should create a new file', () => {
      expect(fileExists()).toBe(false);

      fileService.writeFileSync({
          data: 'lorem ipsum',
          filename,
          folderpath,
      });

      expect(fileExists()).toBe(true);

      fs.unlinkSync(filepath);
    });
  });
  describe('removeFileSync method', () => {
    it('should remove an existent file', () => {      
      fileService.writeFileSync({
        data: 'lorem ipsum',
        filename,
        folderpath,
      });

      expect(fileExists()).toBe(true);
  
      fileService.removeFileSync(filepath);
  
      expect(fileExists()).toBe(false);  
    });
    it(`should not throw error if the file don't exists`, () => {
      expect(fileExists()).toBe(false);
      
      expect(() => {
        fileService.removeFileSync(filepath)
      }).not.toThrow();
    });
  });
  describe('removeFolderSync method', () => {
    it('should remove a folder', () => {
      expect(dirExists()).toBe(false);
      
      fs.mkdirSync(dirname);
      expect(dirExists()).toBe(true);
      
      fileService.removeFolderSync(dirname)
      expect(dirExists()).toBe(false);
    });
  })
});