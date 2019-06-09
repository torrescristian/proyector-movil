const SocketIO = require('socket.io');

module.exports = {
  /**
   * @type {SocketIO.Socket}
   */
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
      this.io.clients((error, clients) => {
        if (error) throw error;
        this.io.emit('server:list-clients', {
          clients,
        });
      });

      socket.on('client:message', (data) => {
        socket.broadcast.emit('server:message', data);
      });

      socket.on('disconnect', (reason) => {
        this.io.clients((error, clients) => {
          if (error) throw error;
          this.io.emit('server:list-clients', {
            clients,
          });
        });
      });
    });
  },

};
