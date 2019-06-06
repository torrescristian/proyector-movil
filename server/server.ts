import express, { Express } from 'express';
import httpContext from 'express-http-context';
import { resolve } from 'path';
import { LoginService } from './services/login.service';
import { rootRouter } from './routes/index';
import { SocketService } from './services/socket.service';

const loginService = new LoginService();
loginService.saveTimestamp();
const app: Express = express();

// middlewares
app.use(express.static(resolve(__dirname, '..', 'project')));
app.use('/', express.static(resolve(__dirname, '..', 'builded-client', 'students')));
app.use('/', express.static(resolve(__dirname, '..', 'builded-client', 'teacher')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(httpContext.middleware);
app.use(rootRouter);

const port: number | string = process.env.PORT || 3000;
export async function startServer(): Promise<any> {
  await new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`starting server on http://localhost:${port}`);
      resolve();
    });
    new SocketService(server);
  });
};
