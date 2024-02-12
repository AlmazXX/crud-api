import http from 'http';
import { port } from './config/config';
import router from './routers/router';

const server = http.createServer((req, res) => {
  router.handleRequest(req, res);
});

server.listen(port, function serverListenerCb() {
  console.log('We are at port %d', port);
});
