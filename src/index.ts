import { port } from './config/config';
import { createServer } from './lib/router';
import router from './router/router';

const server = createServer(router);

server.listen(port, function serverListenerCb() {
  console.log('We are at port %d', port);
});
