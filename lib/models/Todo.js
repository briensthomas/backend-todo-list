const pool = require('../utils/pool');

module.exports = class Todo {
  id;
  created_at;
  detail;
  status;
  user_id;

  constructor(row) {
    this.id = row.id;
    this.created_at = row.created_at;
    this.detail = row.detail;
    this.status = row.status;
    this.user_id = row.user_id;
  }

  static async getAllTasks(user_id) {
    const { rows } = await pool.query(
      `SELECT * FROM todo_list
        WHERE user_id = $1;`,
      [user_id]
    );
    return rows.map((row) => new Todo(row));
  }
// small change
  static async insertTask({ detail, user_id }) {
    const { rows } = await pool.query(
      `INSERT INTO todo_list (detail, user_id)
        VALUES ($1, $2)
        RETURNING *;`,
      [detail, user_id]
    );
    return new Todo(rows[0]);
  }

  static async getTaskById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM todo_list
      WHERE id = $1;`,
      [id]
    );
    return new Todo(rows[0]);
  }

  static async updateTaskStatus(id, update) {
    const task = await Todo.getTaskById(id);
    // console.log('task', task);
    if (!task) return null;
    const updatedTask = { ...task, ...update };

    const { rows } = await pool.query(
      `UPDATE todo_list
      SET status = $2
      WHERE id = $1
      RETURNING *;`,
      [id, updatedTask.status]
    );
    return new Todo(rows[0]);
  }

  static async deleteTask(id) {
    const { rows } = await pool.query(
      `DELETE FROM todo_list
      WHERE id = $1
      RETURNING *;`,
      [id]
    );
    return new Todo(rows[0]);
  }
};
