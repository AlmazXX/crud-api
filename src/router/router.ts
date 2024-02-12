import { randomUUID } from 'crypto';
import { Router, getBody } from '../lib/router';
import { ApiUser, User } from '../types';
import users from '../usersDb';

const router = new Router('/api');

router.get('/users', function getUsers(_req, res) {
  try {
    const stringifiedData = JSON.stringify(users);

    res.writeHead(200, buildHeaders(stringifiedData));
    res.write(stringifiedData);
    return res.end();
  } catch (error) {
    const errorMessage = 'Internal Error message';
    res.writeHead(500, buildHeaders(errorMessage));
    return res.end(error);
  }
});

router.post('/users', async function createUser(req, res) {
  try {
    const body = await getBody(req);
    const { username, age, hobbies }: User = JSON.parse(body);

    if (
      !username ||
      typeof username !== 'string' ||
      !age ||
      isNaN(Number(age)) ||
      !hobbies ||
      !Array.isArray(hobbies)
    ) {
      const errorMessage =
        'Incorrect data provided: `username` field is required and must be type of string, `age` field is required and must be type of number and `hobbies` field is required and must be array of strings';
      res.writeHead(400, buildHeaders(errorMessage));
      res.write(errorMessage);
      return res.end();
    }

    const userData: ApiUser = { id: randomUUID(), username, age, hobbies };
    users.push(userData);
    const stringifiedData = JSON.stringify(userData);

    res.writeHead(201, buildHeaders(stringifiedData));
    res.write(stringifiedData);

    return res.end();
  } catch (error) {
    const errorMessage = 'Internal Error message';
    res.writeHead(500, buildHeaders(errorMessage));
    return res.end(error);
  }
});

function buildHeaders(data: string | Buffer) {
  return {
    'content-length': Buffer.byteLength(data),
    'content-type': 'application/json',
  };
}

export default router;
