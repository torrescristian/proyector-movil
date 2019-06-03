const express = require('express');
const httpContext = require('express-http-context');
const path = require('path');

const app = express();
const loginService = require(path.resolve(__dirname, 'services', 'login.service'));
loginService.saveTimestamp();
const routes = require(path.resolve(__dirname, 'routes'));
const socketService = require(path.resolve(__dirname, 'services', 'socket.service'));

// middlewares
app.use(express.static(path.resolve(__dirname, '..', 'project')));
app.use('/', express.static(path.resolve(__dirname, '..', 'builded-client', 'students')));
app.use('/', express.static(path.resolve(__dirname, '..', 'builded-client', 'teacher')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(httpContext.middleware);
app.use(routes);

const port = process.env.PORT || 3000;
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
