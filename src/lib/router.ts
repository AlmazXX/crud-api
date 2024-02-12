import http from 'http';
import { HTTP_METHODS, REGEX_FOR_ID } from '../constants';
import { Handler, Request, Responce } from '../types';

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

  async handleRequest(req: Request, res: Responce) {
    const { url, method } = req;
    req.body = await this.getBody(req);
    res.send = this.buildResponce(res);

    if (!url || !method) {
      const message = { error: 'Bad Request' };

      res.send(400, message);
      return res.end();
    }

    const path = this.parsePath(url, req);
    const routeKey = `${method} ${path}`;

    const handler = this.routes.get(routeKey);

    if (!handler) {
      const message = { error: 'Incorrect url' };

      res.send(404, message);
      return res.end();
    }

    handler(req, res);
  }

  printRoutes() {
    console.log(this.routes.entries());
  }

  private getBody(req: Request): Promise<string> {
    return new Promise((resolve, reject) => {
      let body: string = '';
      req.setEncoding('utf8');

      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        resolve(body);
      });

      req.on('error', (error) => {
        reject(error);
      });
    });
  }

  private buildResponce(responce: Responce) {
    return function (
      status: number,
      data: unknown,
      headers?: Record<string, string>,
    ) {
      if (status === 204) {
        responce.writeHead(status);
      } else {
        const stringifiedData = JSON.stringify(data);
        responce.writeHead(status, {
          'content-type': 'application/json',
          'content-length': Buffer.byteLength(stringifiedData),
          ...headers,
        });
        responce.write(stringifiedData);
      }
    };
  }

  private parsePath(url: string, req: Request) {
    const pathParts = url.trim().split('/');

    if (REGEX_FOR_ID.test(pathParts[pathParts.length - 1])) {
      const param = { id: pathParts[pathParts.length - 1] };
      pathParts[pathParts.length - 1] = ':id';
      req.param = param;
    }

    return pathParts.join('/');
  }
}

function createServer(router: Router) {
  return http.createServer((req, res) => {
    router.handleRequest(req, res);
  });
}

export { Router, createServer };
