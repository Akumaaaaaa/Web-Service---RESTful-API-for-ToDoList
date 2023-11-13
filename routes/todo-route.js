const express = require("express");
const route = express.Router();
const {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
    deleteAllTodos,
} = require("../controllers/todo-controller");

const { authenticate } = require('../middleware/Auth');

route.use(authenticate);

route.get("/", getAllTodos);
route.get("/:id", getTodoById);
route.post("/", createTodo);
route.put("/:id", updateTodo);
route.delete("/:id", deleteTodo);
route.delete("/", deleteAllTodos);

module.exports = route;
