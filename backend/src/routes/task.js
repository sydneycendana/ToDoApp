const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");

// Get all tasks
router.get("/", taskController.getAllTasks);

// Get a task by ID
router.get("/:id", taskController.getTaskById);

// Create a new task
router.post("/", taskController.createTask);

// Update a task by ID
router.put("/:id", taskController.updateTaskById);

// Delete a task by ID
router.delete("/:id", taskController.deleteTaskById);

module.exports = router;
