const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const taskRoutes = require("./routes/task");
const userRoutes = require("./routes/user");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/user", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
