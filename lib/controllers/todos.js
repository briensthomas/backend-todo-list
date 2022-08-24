const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Todo = require('../models/Todo');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const tasks = await Todo.getAllTasks(req.user.id);
      console.log('req.user.id', req.user.id);
      res.json(tasks);
    } catch(err) {
      next(err);
    }
  })
  
  .post('/', authenticate, async (req, res, next) => {
    try {
      const task = await Todo.insertTask({  
        user_id: req.user.id,
        ...req.body });
      console.log('req.user.id', req.user.id);
      res.json(task);
    } catch(err) {
      next(err);
    }
  })
;
