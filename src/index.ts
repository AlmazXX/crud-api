import http from 'http';
import { port } from './config/config';

const server = http.createServer();

server.listen(port, function serverListenerCb() {
  console.log('We are at port %d', port);
});
