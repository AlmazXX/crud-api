import { randomUUID } from 'crypto';
import { Router } from '../lib/router';
import { ApiUser, User } from '../types';

let users: ApiUser[] = [];

const router = new Router('/api');

router.get('/users', function getUsers(_req, res) {
  try {
    res.send!(200, users);

    return res.end();
  } catch (error) {
    const message = { error: 'Internal Error message' };

    res.send!(500, message);
    return res.end(error);
  }
});

router.get('/users/:id', function getSingleUser(req, res) {
  try {
    const userId = req.param!.id;

    if (!userId) {
      const message = {
        error: 'Incorrect param provided: `id` param is required',
      };

      res.send!(400, message);
      return res.end();
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      const message = {
        error: 'User with the provided id is not found',
      };

      res.send!(404, message);
      return res.end();
    }

    res.send!(200, user);
    return res.end();
  } catch (error) {
    const message = { error: 'Internal Error message' };

    res.send!(500, message);
    return res.end(error);
  }
});

router.post('/users', async function createUser(req, res) {
  try {
    const body = <string>req.body;
    const { username, age, hobbies }: User = JSON.parse(body);

    if (
      !username ||
      typeof username !== 'string' ||
      !age ||
      isNaN(Number(age)) ||
      !hobbies ||
      !Array.isArray(hobbies)
    ) {
      const message = {
        error:
          'Incorrect data provided: `username` field is required and must be type of string, `age` field is required and must be type of number and `hobbies` field is required and must be array of strings',
      };

      res.send!(400, message);
      return res.end();
    }

    const userData: ApiUser = { id: randomUUID(), username, age, hobbies };
    users.push(userData);

    res.send!(201, userData);
    return res.end();
  } catch (error) {
    const message = { error: 'Internal Error message' };

    res.send!(500, message);
    return res.end(error);
  }
});

router.put('/users/:id', function updateUser(req, res) {
  try {
    const userId = req.param!.id;
    const body = <string>req.body;
    const { username, age, hobbies }: User = JSON.parse(body);

    if (
      !username ||
      typeof username !== 'string' ||
      !age ||
      isNaN(Number(age)) ||
      !hobbies ||
      !Array.isArray(hobbies)
    ) {
      const message = {
        error:
          'Incorrect data provided: `username` field must be type of string, `age` must be type of number and `hobbies` field must be array of strings',
      };

      res.send!(400, message);
      return res.end();
    }

    if (!userId) {
      const message = {
        error: 'Incorrect param provided: `id` param is required',
      };

      res.send!(400, message);
      return res.end();
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      const message = {
        error: 'User with the provided id is not found',
      };

      res.send!(404, message);
      return res.end();
    }

    user.username = username;
    user.age = age;
    user.hobbies = hobbies;

    users = users.map((u) => (u.id === user.id ? user : u));

    res.send!(200, user);
    return res.end();
  } catch (error) {
    const message = { error: 'Internal Error message' };

    res.send!(500, message);
    return res.end(error);
  }
});

router.delete('/users/:id', function deleteUser(req, res) {
  try {
    const userId = req.param!.id;

    if (!userId) {
      const message = {
        error: 'Incorrect param provided: `id` param is required',
      };

      res.send!(400, message);
      return res.end();
    }

    users = users.filter((u) => u.id !== userId);

    res.send!(204, null);
    return res.end();
  } catch (error) {
    const message = { error: 'Internal Error message' };

    res.send!(500, message);
    return res.end(error);
  }
});

export default router;
