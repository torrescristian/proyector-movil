const { Menu } = require('electron');

module.exports = {
  init(browser) {
    const menu = Menu.buildFromTemplate([
      {
        label: 'Archivos',
        role: 'File',
        submenu: [
          {
            label: 'Exit',
            role: 'close',
          },
          {
            label: 'QR',
            click() {
              browser.redirectFile('qr');
            },
          },
        ],
      },
      {
        label: 'Editar',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          { role: 'pasteandmatchstyle' },
          { role: 'delete' },
          { role: 'selectall' },
        ],
      },
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forcereload' },
          { role: 'toggledevtools' },
          { type: 'separator' },
          { role: 'resetzoom' },
          { role: 'zoomin' },
          { role: 'zoomout' },
          { type: 'separator' },
          { role: 'togglefullscreen' },
        ],
      },
      {
        role: 'window',
        submenu: [{ role: 'minimize' }, { role: 'close' }],
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Learn More',
            click() {
              require('electron').shell.openExternal('https://electronjs.org');
            },
          },
        ],
      },
    ]);
    Menu.setApplicationMenu(menu);
  },
};
