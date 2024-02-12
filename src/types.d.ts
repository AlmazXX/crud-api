import { IncomingMessage, ServerResponse } from 'http';

export interface Request extends IncomingMessage {
  param?: Record<string, string>;
}

export interface Responce extends ServerResponse<IncomingMessage> {
  req: IncomingMessage;
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
