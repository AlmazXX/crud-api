import { IncomingMessage, ServerResponse } from 'http';

export interface Request extends IncomingMessage {
  param?: Record<string, string>;
  body?: string;
}

export interface Responce extends ServerResponse {
  send?: (
    status: number,
    data: unknown,
    headers?: Record<string, string>,
  ) => void;
}

export type Handler = (
  req: Request,
  res: Responce,
) => Responce | Promise<Responce>;

export interface User {
  username: string;
  age: number;
  hobbies: string[];
}

export interface ApiUser extends User {
  id: string;
}
