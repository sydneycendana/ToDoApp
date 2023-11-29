// mySeedScript.js

const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require("../models/user");
const Task = require("../models/task");

async function seedDB() {
  try {
    await User.collection.drop();
    await Task.collection.drop();

    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        username: `user${i}`,
        password: "password",
      });
    }
    const seededUsers = await User.insertMany(users);

    const tasks = [];
    for (let i = 0; i < 20; i++) {
      const recurring = i < 2 && Math.random() < 0.5; // Only the first 2 tasks are recurring
      const recurringInfo = recurring ? getRandomRecurringInfo(i) : null;

      tasks.push({
        title: `Task ${i + 1}`,
        owner: seededUsers[i % seededUsers.length]._id,
        dueDate: new Date(
          Date.now() + Math.random() * 20 * 24 * 60 * 60 * 1000
        ), // Due date within the next 20 days
        completed: Math.random() < 0.5,
        recurring,
        recurringInfo,
      });
    }
    await Task.insertMany(tasks);

    console.log("Database seeded! :)");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

function getRandomRecurringInfo(index) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (Math.random() < 0.5) {
    // Choose days of the week
    const randomDays = [];
    for (let i = 0; i < Math.floor(Math.random() * 7) + 1; i++) {
      randomDays.push(daysOfWeek[i]);
    }
    return { daysOfWeek: randomDays, daysOfMonth: [] };
  } else {
    // Choose days of the month
    const randomDays = [];
    for (let i = 0; i < Math.floor(Math.random() * 10) + 1; i++) {
      randomDays.push(Math.floor(Math.random() * 31) + 1);
    }
    return { daysOfWeek: [], daysOfMonth: randomDays };
  }
}

seedDB();
