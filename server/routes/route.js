const express = require("express");
const {addTodo, getAllTodo, deleteTodo, completeTodo, getTodoById, addSubTasks, updateSubTask} = require("../controller/todo-controller");
const Routes = express.Router();

Routes.post("/todos", addTodo)
Routes.get("/todos", getAllTodo)
Routes.get("/todos/:id", getTodoById)
Routes.delete("/todos/:id", deleteTodo)
Routes.patch("/todos/:id", completeTodo)
Routes.patch("/todos/:id/subtasks", addSubTasks)
Routes.patch("/todos/:TaskID/:subID", updateSubTask)

module.exports = Routes;