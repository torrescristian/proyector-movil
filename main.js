const { app } = require('electron');
const path = require('path')
const loginService = require(path.resolve(__dirname, 'server', 'services', 'login.service'));
process.env.NODE_CONFIG_DIR = path.resolve(__dirname, 'config');

app.on('ready', async () => {
  // start server
  const server = require(path.resolve(__dirname, 'server', 'server.js'));
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
  init() {
    // open window
    const mainWindow = new BrowserWindow({ width: 800, height: 500 });
    mainWindow.maximize();
    const teacherUrl = `${config.get('teacherUrl')}?token=${loginService.create()}`;
    mainWindow.loadURL(teacherUrl);
  },
};
