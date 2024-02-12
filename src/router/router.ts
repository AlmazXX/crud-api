import { randomUUID } from 'crypto';
import { Router, getBody } from '../lib/router';
import { ApiUser, User } from '../types';

let users: ApiUser[] = [];

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

router.get('/users/:id', function getSingleUser(req, res) {
  try {
    const userId = req.param!.id;

    if (!userId) {
      const errorMessage = 'Incorrect param provided: `id` param is required';
      res.writeHead(400, buildHeaders(errorMessage));
      res.write(errorMessage);
      return res.end();
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      const errorMessage = 'User with the provided id is not found';
      res.writeHead(404, buildHeaders(errorMessage));
      res.write(errorMessage);
      return res.end();
    }

    const stringifiedData = JSON.stringify(user);

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

router.put('/users/:id', async function updateUser(req, res) {
  try {
    const userId = req.param!.id;
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
        'Incorrect data provided: `username` field must be type of string, `age` must be type of number and `hobbies` field must be array of strings';
      res.writeHead(400, buildHeaders(errorMessage));
      res.write(errorMessage);
      return res.end();
    }

    if (!userId) {
      const errorMessage = 'Incorrect param provided: `id` param is required';
      res.writeHead(400, buildHeaders(errorMessage));
      res.write(errorMessage);
      return res.end();
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      const errorMessage = 'User with the provided id is not found';
      res.writeHead(404, buildHeaders(errorMessage));
      res.write(errorMessage);
      return res.end();
    }

    users = users.map((u) =>
      u.id === user.id ? { ...u, username, age, hobbies } : u,
    );

    const stringifiedData = JSON.stringify(user);

    res.writeHead(200, buildHeaders(stringifiedData));
    res.write(stringifiedData);
    return res.end();
  } catch (error) {
    const errorMessage = 'Internal Error message';
    res.writeHead(500, buildHeaders(errorMessage));
    return res.end(error);
  }
});

router.delete('/users/:id', function deleteUser(req, res) {
  try {
    const userId = req.param!.id;

    if (!userId) {
      const errorMessage = 'Incorrect param provided: `id` param is required';
      res.writeHead(400, buildHeaders(errorMessage));
      res.write(errorMessage);
      return res.end();
    }

    users = users.filter((u) => u.id !== userId);

    res.writeHead(204);
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
