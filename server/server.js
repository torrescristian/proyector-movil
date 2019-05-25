const express = require('express');
const httpContext = require('express-http-context');
const path = require('path');
const config = require('config');

const app = express();
const loginService = require('./services/login.service');
loginService.saveTimestamp();
const routes = require('./routes');
const socketService = require('./services/socket.service');

// middlewares
app.use(express.static(path.join(__dirname, '..', 'project')));
app.use('/', express.static(`${__dirname}/../builded-client/teacher`));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(httpContext.middleware);
app.use(routes);

const port = process.env.PORT || 3000;
const env = config.util.getEnv('NODE_ENV');
if (['dev', 'production'].includes(env)) {
  module.exports = {
    async init() {
      await new Promise((resolve, reject) => {
        const server = app.listen(port, (req, res) => {
          console.log(`starting server on http://localhost:${port}`);
          resolve();
        });
        socketService.init(server);
      });
    },
  };
} else {
  const server = app.listen(port, (req, res) => {
    console.log(`starting server on http://localhost:${port}`);
  });
  socketService.init(server);
}
