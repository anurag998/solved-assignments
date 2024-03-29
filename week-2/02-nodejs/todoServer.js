/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const todos = [];
let id = 1;

app.get("/todos", function (req, res) {
  res.status(200).send(todos);
});

app.post("/todos", function (req, res) {
  const todoItem = req.body;
  // console.log(todoItem);
  todoItem["id"] = id;
  todos.push(todoItem);
  res.status(201).send({ id });
  id++;
});

app.get("/todos/:id", function (req, res) {
  const idReq = req.params.id;
  // console.log(id);
  let sent = false;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i]["id"] == idReq) {
      res.status(200).send(todos[i]);
      sent = true;
      break;
    }
  }
  if (sent == false) {
    res.status(404).send("Not Found");
  }
});

app.put("/todos/:id", function (req, res) {
  const idReq = req.params.id;
  console.log(idReq);
  const values = req.body;
  let updated = false;
  // const

  for (let i = 0; i < todos.length; i++) {
    if (todos[i]["id"] == idReq) {
      const keysToUpdate = Object.keys(values);
      for (keys of keysToUpdate) {
        todos[i][keys] = values[keys];
      }

      updated = true;
      res.status(200).send("");
      break;
    }
  }
  if (updated == false) {
    res.status(404).send("");
  }
});

app.delete("/todos/:id", function (req, res) {
  const idReq = req.params.id;
  console.log(idReq);
  let deleted = false;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i]["id"] == idReq) {
      // delete todos[i];
      todos.splice(i,1);
      deleted = true;
      res.status(200).send("");
      break;
    }
  }

  if (deleted == false) {
    res.status(404).send("");
  }
});

// app.listen(3000);

module.exports = app;
