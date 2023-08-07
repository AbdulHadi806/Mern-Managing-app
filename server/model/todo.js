const mongoose = require("mongoose")

const subtaskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

const todoSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true
  },
  subtasks: {
    type: [subtaskSchema],
    default: []
  },
  done: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {timestamps: true})
const todo = new mongoose.model("Todo", todoSchema)
module.exports = todo