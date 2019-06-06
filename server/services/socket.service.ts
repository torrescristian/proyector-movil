import { Server as HttpServer } from 'http';
import SocketIO, { Socket, Server as SocketServer } from 'socket.io';

export class SocketService {
  io: SocketServer;

  constructor(server: HttpServer) {
    this.io = SocketIO(server, {
      pingInterval: 1000,
    });
    this.attachEvents();
  };

  attachEvents(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log('New connection', socket.id);
      socket.on('client:message', (data: any) => {
        socket.broadcast.emit('server:message', data);
      });
    });
  };
};
