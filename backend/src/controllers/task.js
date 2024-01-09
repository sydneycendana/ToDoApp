const Task = require("../models/task");
const { authenticateUser, checkTaskOwnership } = require("./auth");
const jwt = require("jsonwebtoken");
const moment = require("moment");

exports.getAllTasks = [
  authenticateUser,
  async (req, res) => {
    try {
      const token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;

      // Get the current week index from the query parameter or default to 0 (current week)
      const weekIndex = parseInt(req.query.weekIndex) || 0;

      // Calculate the target date based on the current date and the week index
      const targetDate = moment().add(weekIndex, "weeks");

      // Get the start and end dates of the target week
      const startOfWeek = targetDate.clone().startOf("week");
      const endOfWeek = targetDate.clone().endOf("week");

      // Modify the query to fetch tasks within the specified week
      const tasks = await Task.find({
        owner: req.userId,
        dueDate: { $gte: startOfWeek.toDate(), $lt: endOfWeek.toDate() },
      });

      if (tasks.length === 0) {
        return res
          .status(404)
          .json({ message: "No tasks found for the specified criteria" });
      }

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
