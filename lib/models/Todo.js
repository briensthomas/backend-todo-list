const pool = require('../utils/pool');

module.export = class Todo {
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

  static async getAllTasks(id) {
    const { rows } = await pool.query(
      `SELECT * FROM todo_list
        WHERE id = $1;`,
      [id]
    );
    return rows.map((row) => new Todo(row));
  }
};
