const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Task = require('../models/Task');

router.get('/tasks', auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.userId });
  res.json(tasks);
});

router.post('/tasks', auth, async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.user.userId });
  res.json(task);
});

module.exports = router;