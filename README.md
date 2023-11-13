# Web Service & RESTful API for Todo List

This documentation provides an overview of the **Web Service** and **RESTful API** implemented in the Todo List, built using
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=mongodb,express,nodejs,postman" />
  </a>
</p>

## Table of Contents
- [Overview](https://github.com/Akumaaaaaa/Web-Service-and-RESTful-API-for-ToDoList.git#overview)
- [Getting Started](https://github.com/Akumaaaaaa/Web-Service-and-RESTful-API-for-ToDoList.git#getting-started)
- [Authentication](https://github.com/Akumaaaaaa/Web-Service-and-RESTful-API-for-ToDoList.git#authentication)
- [User Routes](https://github.com/Akumaaaaaa/Web-Service-and-RESTful-API-for-ToDoList.git#user-routes)
- [Todo Routes](https://github.com/Akumaaaaaa/Web-Service-and-RESTful-API-for-ToDoList.git#todo-routes)
- [Error Handling](https://github.com/Akumaaaaaa/Web-Service-and-RESTful-API-for-ToDoList.git#error-handling)

<br>

### 1. Overview <a name="overview"></a>
The Todo List is a simple web service that allows users to manage their todo items. Users can **register, log in, create, update, and delete their todos**. The application uses **MongoDB** as its database and **JWT** for authentication.

<br>

### 2. Getting Started <a name="getting-started"></a>
**a. Prerequisites**
- Node.js installed
- MongoDB Atlas account for database (update the .env file with your MongoDB connection URL)
- Set up environment variables in a ```.env``` file

<br>

**b. Installation**
- Clone the repository to your local machine:
```
git clone https://github.com/Akumaaaaaa/Web-Service-and-RESTful-API-for-ToDoList.git
```
- Open the project directory
```
cd Web-Service-and-RESTful-API-for-ToDoList
npm install
```
- Run it
```
npm start
```
The server will be running on `http://localhost:3000`

<br>

### 3. Authentication <a name="authentication"></a>
The API uses **JWT (JSON Web Token)** for user authentication. To access protected routes, include the token in the Authorization header of your requests.
```
Authorization: Bearer YOUR_JWT_TOKEN
```

<br>

### 4. User Routes <a name="user-routes"></a>
**Public Routes (No Authentication Required)** <br>
a. Register User
- Endpoint: ```POST /users```
- Request Body:
```
{
  "name": "Akmal",
  "username": "Akmal",
  "email": "Akmal@example.com",
  "password": "securepassword"
}
```
- Description: Creates a new user.

<br>

b. Login User
- Endpoint: ```POST /users/login```
- Request Body:
```
{
  "email": "Akmal@example.com",
  "password": "securepassword"
}
```
- Description: Logs in an existing user and returns a JWT token.

<br>

**Protected Routes (Authentication Required)** <br>
a. Get All Users
- Endpoint: ```GET /users```
- Description: Retrieves a list of all users.

<br>

b. Get User by ID
- Endpoint: ```GET /users/:id```
- Description: Retrieves user details by user ID.

<br>

### 5. Todo Routes <a name="todo-routes"></a>

**Protected Routes (Authentication Required))** <br>
a. Get All Todos
- Endpoint: ```GET /todos```
- Description: Retrieves all todos for the authenticated user.

<br>

b. Get Todo by ID
- Endpoint: ```GET /todos/:id```
- Description: Retrieves a todo by its ID for the authenticated user.

<br>

c. Create Todo
- Endpoint: ```POST /todos```
- Request Body:
```
{
  "title": "Minum",
  "description": "Air"
}
```
- Description: Creates a new todo for the authenticated user.

<br>

d. Update Todo
- Endpoint: ```PUT /todos/:id```
- Request Body:
```
{
  "title": "Minum",
  "description": "Air Kelapa",
  "completed": true
}
```
- Updates an existing todo by its ID for the authenticated user.

<br>

e. Delete Todo
- Endpoint: ```DELETE /todos/:id```
- Description: Deletes a todo by its ID for the authenticated user.

<br>

f. Delete All Todos
- Endpoint: ```DELETE /todos```
- Description: Deletes all todos for the authenticated user.

<br>

### 6. Error Handling <a name="error-handling"></a>
The API provides standard HTTP status codes for responses. In case of an error, the response will include a JSON object with a message property describing the error.
```
{
  "message": "Unauthorized"
}
```

<br>

Full Documentation Available here: https://documenter.getpostman.com/view/31106938/2s9YXmVzW3
