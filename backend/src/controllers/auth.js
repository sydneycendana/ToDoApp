const jwt = require("jsonwebtoken");
const Task = require("../models/task");

// Middleware to authenticate the user
exports.authenticateUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Middleware to check if the user is the owner of the task
exports.checkTaskOwnership = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.owner.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Forbidden: You do not have access to this task" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
