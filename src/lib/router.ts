import http from 'http';
import { Handler, Request, Responce } from '../types';

const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
  CONNECT: 'CONNECT',
  TRACE: 'TRACE',
};

class Router {
  routes: Map<string, Handler>;
  defaultUrl: string;

  constructor(defaultUrl: string = '/') {
    this.routes = new Map();
    this.defaultUrl = defaultUrl;
  }

  setDefaultUrl(url: string) {
    this.defaultUrl = url;
  }

  private addRoute(method: string, path: string, handler: Handler) {
    this.routes.set(`${method} ${this.defaultUrl}${path}`, handler);
  }

  get(path: string, handler: Handler) {
    this.addRoute(HTTP_METHODS.GET, path, handler);
  }

  post(path: string, handler: Handler) {
    this.addRoute(HTTP_METHODS.POST, path, handler);
  }

  put(path: string, handler: Handler) {
    this.addRoute(HTTP_METHODS.PUT, path, handler);
  }

  delete(path: string, handler: Handler) {
    this.addRoute(HTTP_METHODS.DELETE, path, handler);
  }

  patch(path: string, handler: Handler) {
    this.addRoute(HTTP_METHODS.PATCH, path, handler);
  }

  head(path: string, handler: Handler) {
    this.addRoute(HTTP_METHODS.HEAD, path, handler);
  }

  options(path: string, handler: Handler) {
    this.addRoute(HTTP_METHODS.OPTIONS, path, handler);
  }

  connect(path: string, handler: Handler) {
    this.addRoute(HTTP_METHODS.CONNECT, path, handler);
  }

  trace(path: string, handler: Handler) {
    this.addRoute(HTTP_METHODS.TRACE, path, handler);
  }

  handleRequest(req: Request, res: Responce) {
    const { url, method } = req;

    if (!url || !method) {
      console.log('400 Bad Request');
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad Request');
      return res.end();
    }

    const routeKey = `${method} ${url}`;

    const handler = this.routes.get(routeKey);

    if (!handler) {
      console.log('404 Not Found');
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('Incorrect url');
      return res.end();
    }

    handler(req, res);
  }

  printRoutes() {
    console.log(this.routes.entries());
  }
}

function createServer(router: Router) {
  return http.createServer((req, res) => {
    router.handleRequest(req, res);
  });
}

function getBody(req: Request): Promise<string> {
  return new Promise((resolve, reject) => {
    let data: string = '';
    req.setEncoding('utf8');

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      resolve(data);
    });

    req.on('error', (error) => {
      reject(error);
    });
  });
}

export { Router, createServer, getBody };
