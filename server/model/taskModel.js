const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Done"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
