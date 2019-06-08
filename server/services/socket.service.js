const SocketIO = require('socket.io');

module.exports = {
  io: null,
  /**
   * @param {Express.Application} server 
   */
  init(server) {
    this.io = SocketIO(server, {
      pingInterval: 1000,
    });
    this.attachEvents();
  },

  attachEvents() {
    this.io.on('connection', (socket) => {
      console.log('New connection', socket.id);
      socket.on('client:message', (data) => {
        socket.broadcast.emit('server:message', data);
      });
    });
  },

};
