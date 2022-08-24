const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Todo = require('../models/Todo');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const tasks = await Todo.getAllTasks(req.user.id);
      res.json(tasks);
    } catch(err) {
      next(err);
    }
  });
