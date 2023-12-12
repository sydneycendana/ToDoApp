const Task = require("../models/task");
const { authenticateUser, checkTaskOwnership } = require("./auth");
const jwt = require("jsonwebtoken");

// Get all tasks
exports.getAllTasks = [
  authenticateUser,
  async (req, res) => {
    try {
      const token = req.cookies.token;

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      console.log(req.userId);
      const tasks = await Task.find({ owner: req.userId });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];

// Get a task by ID
exports.getTaskById = [
  authenticateUser,
  checkTaskOwnership,
  async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];

// Create a new task
exports.createTask = [
  authenticateUser,
  async (req, res) => {
    try {
      const task = new Task(req.body);
      const savedTask = await task.save();
      res.status(201).json(savedTask);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];

// Update a task by ID
exports.updateTaskById = [
  authenticateUser,
  checkTaskOwnership,
  async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];

// Delete a task by ID
exports.deleteTaskById = [
  authenticateUser,
  checkTaskOwnership,
  async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
