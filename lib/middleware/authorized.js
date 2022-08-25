const Todo = require('../models/Todo');

module.exports = async (req, res, next) => {
  try {
    const task = await Todo.getTaskById(req.params.id);
    if (req.user.id !== task.user_id)
      throw new Error('You do not have access to view this page');
        
    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
