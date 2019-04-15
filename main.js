const { app } = require('electron');

app.on('ready', () => {
  // start server
  require('./server/server.js');
  // config menu
  const menu = require('./electron/menu');
  menu.init(browser);
  // start UI
  browser.init();
});

app.on('window-all-closed', () => {
  app.quit();
});

/**
 *   ######### WINDOWS #########
 * its required for Electron.js that the
 * 'loadURL' method is called in the 'main.js' file
 * so we can't put this snipet in another file as we like to
 **/

// load teacher page
const { BrowserWindow } = require('electron');
const url = require('url');

const browser = {
  mainWindow: null,
  init() {
    // open window
    this.mainWindow = new BrowserWindow({ width: 800, height: 500 });
    this.mainWindow.maximize();
    this.mainWindow.loadURL(
      url.format({
        pathname: `${__dirname}/builded-client/teacher/index.html`,
        protocol: 'file:',
        slashes: true,
      })
    );
  },
  redirect(URL = '') {
    this.mainWindow.loadURL(URL);
  },
  redirectFile(file = 'index') {
    this.mainWindow.loadURL(`${__dirname}/builded-client/teacher/${file}.html`);
  },
};
