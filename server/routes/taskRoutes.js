const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");

router.post("/task", taskController.createTask);
router.get("/task", taskController.getAllTasks);
router.put("/task/:id", taskController.updateTask);
router.delete("/task/:id", taskController.deleteTask);

module.exports = router;
