const express = require('express');
const app = express();
const loginService = require('./services/login.service');
loginService.saveTimestamp();
const routes = require('./routes');
const socketService = require('./services/socket.service');

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3000;
const server = app.listen(port, (req, res) => {
  console.log(`starting server on http://localhost:${port}`);
});
socketService.init(server);
