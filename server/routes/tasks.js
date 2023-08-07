const express = require("express");
const {addTodo, getAllTodo, deleteTodo, completeTodo, addSubTasks, updateSubTask, getMyTasks} = require("../controller/todo-controller");
const TaskRoutes = express.Router();

TaskRoutes.post("/todos", addTodo)
TaskRoutes.get("/todos", getAllTodo)
TaskRoutes.get("/myTasks", getMyTasks)
TaskRoutes.delete("/todos/:id", deleteTodo)
TaskRoutes.patch("/todos/:id", completeTodo)
TaskRoutes.patch("/todos/:id/subtasks", addSubTasks)
TaskRoutes.patch("/todos/:TaskID/:subID", updateSubTask)
// TaskRoutes.get("/login", sendLoginUser)

module.exports = TaskRoutes;