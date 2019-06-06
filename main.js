const { app } = require('electron');
const path = require('path')
const { LoginService } = require(path.resolve(__dirname, 'lib/services/login.service'));
const loginService = new LoginService();
process.env.NODE_CONFIG_DIR = path.resolve(__dirname, 'config');
const { startServer } = require(path.resolve(__dirname, 'lib/server.js'));

app.on('ready', async () => {
  await startServer();
  startWindow();
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

function startWindow() {
  const mainWindow = new BrowserWindow({ width: 800, height: 500 });
  mainWindow.maximize();
  const teacherUrl = `${config.get('teacherUrl')}?token=${loginService.create()}`;
  mainWindow.loadURL(teacherUrl);
};
