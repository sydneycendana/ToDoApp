// userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

// Registration route
router.post("/register", userController.register);

// Login route
router.post("/login", userController.login);

// Logout route
router.post("/logout", userController.logout);

// Add more routes as needed

module.exports = router;
