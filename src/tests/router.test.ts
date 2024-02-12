import supertest from 'supertest';
import { createServer } from '../lib/router';
import router from '../router/router';
import { ApiUser, User } from '../types';

const server = createServer(router);

describe('router instance test', () => {
  test('should receive epmty list of users', async () => {
    const expected: ApiUser[] = [];
    const responce = await supertest(server).get('/api/users');

    expect(responce.statusCode).toBe(200);
    expect(responce.body).toEqual(expected);
  });

  test('should create a new user', async () => {
    const newUser: User = {
      username: 'John Doe',
      age: 35,
      hobbies: ['puzzles'],
    };

    const responce = await supertest(server).post('/api/users').send(newUser);
    const resBody = responce.body;

    expect(responce.statusCode).toBe(201);
    expect(resBody).toHaveProperty('id');
    expect(resBody.username).toEqual(newUser.username);
    expect(resBody.age).toEqual(newUser.age);
    expect(resBody.hobbies).toEqual(newUser.hobbies);
  });
});
