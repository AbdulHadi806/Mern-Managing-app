const Todo = require("../model/todo");

const addTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      data: req.body.data,
      createdAt: Date.now(),
    }); 

    await newTodo.save();
    return res.status(200).json(newTodo);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.find({})
    return res.status(200).json(todos)
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

const getTodoById = async (req, res) => {
  try {
    const _id = req.params.id
    const deletedTodo = await Todo.findById(_id)
    res.status(200).json(deletedTodo)
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

const deleteTodo = async (req, res) => {
  try {
    const _id = req.params.id
    const deletedTodo = await Todo.findByIdAndDelete(_id)
    res.status(200).json(deletedTodo)
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

const completeTodo = async (req, res) => {
  try {
    const _id = req.params.id;
    const existingTodo = await Todo.findById(_id);
    const allSubTasksDone = existingTodo.subtasks.every(i => i.done === true);
    let updatedDone = false;
    if(req.body.type == "MAIN_TODO") {
       updatedDone = !existingTodo.done;
    }
    else {
      updatedDone = allSubTasksDone
    }
    req.body.done = updatedDone;
    const updatedTodo = await Todo.findByIdAndUpdate(_id, req.body, { new: true });
    res.status(200).json(updatedTodo);
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

const addSubTasks = async (req, res) => {
  try {
    const _id = req.params.id;
    const existingTodo = await Todo.findById(_id);
    existingTodo.subtasks.push({ description: req.body.subtask });
    const updatedTodo = await Todo.findByIdAndUpdate(_id, existingTodo, {new: true})
    res.status(200).json(updatedTodo);
  } catch(err) {
    return res.status(500).json(err.message)
  }
}

const updateSubTask = async (req, res) => {
  try {
    const _idTask = req.params.TaskID;
    const _idSub = req.params.subID;
    const existingTodo = await Todo.findById(_idTask);
    const existingSubTask = existingTodo.subtasks.find(
      (subtask) => subtask._id.toString() === _idSub
    );
    existingSubTask.done = !existingSubTask.done;
    await existingTodo.save();
    return res.status(200).json(existingSubTask);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};



exports.updateSubTask = updateSubTask
exports.addSubTasks = addSubTasks
exports.getTodoById = getTodoById
exports.completeTodo = completeTodo
exports.deleteTodo = deleteTodo
exports.getAllTodo = getAllTodo
exports.addTodo = addTodo;