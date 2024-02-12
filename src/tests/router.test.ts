import supertest from 'supertest';
import { createServer } from '../lib/router';
import router from '../router/router';
import { ApiUser, User } from '../types';

const server = createServer(router);

describe('router instance test', () => {
  let expectedUser: ApiUser;
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
    expectedUser = responce.body;

    expect(responce.statusCode).toBe(201);
    expect(expectedUser).toHaveProperty('id');
    expect(expectedUser.username).toEqual(newUser.username);
    expect(expectedUser.age).toEqual(newUser.age);
    expect(expectedUser.hobbies).toEqual(newUser.hobbies);
  });

  test('should receive created user', async () => {
    const responce = await supertest(server).get(
      `/api/users/${expectedUser.id}`,
    );

    expect(responce.status).toBe(200);
    expect(responce.body.id).toEqual(expectedUser.id);
    expect(responce.body).toEqual(expectedUser);
  });
});
