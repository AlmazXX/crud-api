# CRUD API

This project implements a simple CRUD (Create, Read, Update, Delete) API using native Node.js.

## Installation

Check out the project cloning the repo and installing all dependencies.

```bash
    git clone https://github.com/AlmazXX/crud-api.git
    cd crud-api
    npm install
```

## Environment Variables

To run this project, you may add the following environment variables to your .env file

`PORT` - any 4-digit combination. If not specified, default port will be used

## Deployment

To deploy this project on production mode run

```bash
  npm run start:prod
```

For development mode run

```bash
  npm run start:dev
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Usage/Examples

Here are some usage examples using Postman for making requests to the CRUD API endpoints.

* Retrieving all users

`GET /api/users`

Make a GET request to `http://localhost:{port}/api/users` to retrieve all users.

* Retrieving a specific user by ID
`GET /api/users/{userId}`

Replace {userId} with the ID of the user you want to retrieve.

Make a GET request to `http://localhost:{port}/api/users/{userId}`.

* Creating a new user

`POST /api/users`

Make a POST request to `http://localhost:{port}/api/users`.

Set the request body with JSON data containing the user information:
```json
{
    "username": "JohnDoe",
    "age": 30,
    "hobbies": ["reading", "hiking"]
}
```

* Updating an existing user

`PUT /api/users/{userId}`

Replace {userId} with the ID of the user you want to update.

Make a PUT request to `http://localhost:{port}/api/users/{userId}`.

Set the request body with JSON data containing the updated user information.

* Deleting a user
`DELETE /api/users/{userId}`

Replace {userId} with the ID of the user you want to delete.

Make a DELETE request to `http://localhost:{port}/api/users/{userId}`.


Make sure to replace {port} with the port number your application is running on. You can find this information in your .env file.

These examples demonstrate how to interact with the CRUD API endpoints using Postman. You can also use similar steps with other API testing tools or directly in your browser by navigating to the specified endpoints.
