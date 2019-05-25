const { app } = require('electron');
const loginService = require('./server/services/login.service');

app.on('ready', async () => {
  // start server
  const server = require('./server/server.js');
  await server.init();
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
const config = require('config');

const browser = {
  mainWindow: null,
  init() {
    // open window
    this.mainWindow = new BrowserWindow({ width: 800, height: 500 });
    this.mainWindow.maximize();
    const teacherUrl = `${config.get('teacherUrl')}?token=${loginService.create()}`;
    this.mainWindow.loadURL(teacherUrl);
  },
};
