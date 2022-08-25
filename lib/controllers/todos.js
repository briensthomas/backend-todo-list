const { Router } = require('express');
const authenticated = require('../middleware/authenticate');
const authorized = require('../middleware/authorized');
const Todo = require('../models/Todo');

module.exports = Router()
  .get('/', authenticated, async (req, res, next) => {
    try {
      const tasks = await Todo.getAllTasks(req.user.id);
      //   console.log('req.user.id', req.user.id);
      res.json(tasks);
    } catch(err) {
      next(err);
    }
  })
  
  .post('/', authenticated, async (req, res, next) => {
    try {
      const task = await Todo.insertTask({  
        user_id: req.user.id,
        ...req.body });
      //   console.log('req.user.id', req.user.id);
      res.json(task);
    } catch(err) {
      next(err);
    }
  })

  .put('/:id', authenticated, authorized, async (req, res, next) => {
    try {
    //   console.log(req.params.id);
      const task = await Todo.updateTaskStatus(req.params.id, req.body);
      res.json(task);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', authenticated, authorized, async (req, res, next) => {
    try {
      await Todo.deleteTask(req.params.id);
      res.status(204).send();
    } catch(err) {
      next(err);
    }
  })
;
