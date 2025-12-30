const db = require('../config/database');

const TaskModel = {
    create: async (userId, title, description, status) => {
        const sql = 'INSERT INTO tasks (user_id, title, description, status) VALUES ($1, $2, $3, $4) RETURNING *';
        const { rows } = await db.query(sql, [userId, title, description, status || 'pending']);
        return rows[0];
    },

    findAllByUserId: async (userId, filter = {}, pagination = {}) => {
        const { status } = filter;
        const { limit = 10, offset = 0 } = pagination;

        let query = 'SELECT * FROM tasks WHERE user_id = $1';
        const params = [userId];

        // Add Filter
        if (status && status !== 'all') {
            query += ' AND status = $2';
            params.push(status);
        }

        // Order
        query += ' ORDER BY created_at DESC';

        // Add Pagination
        // Note: Parameters index must be dynamic
        const limitParamIndex = params.length + 1;
        const offsetParamIndex = params.length + 2;

        query += ` LIMIT $${limitParamIndex} OFFSET $${offsetParamIndex}`;
        params.push(limit, offset);

        const { rows } = await db.query(query, params);

        // Get Total Count for Pagination metadata
        // A optimized way is to use window functions, but a separate count is simpler for now
        let countQuery = 'SELECT COUNT(*) FROM tasks WHERE user_id = $1';
        const countParams = [userId];
        if (status && status !== 'all') {
            countQuery += ' AND status = $2';
            countParams.push(status);
        }

        const countResult = await db.query(countQuery, countParams);

        return {
            tasks: rows,
            total: parseInt(countResult.rows[0].count, 10)
        };
    },

    findById: async (taskId) => {
        const sql = 'SELECT * FROM tasks WHERE id = $1';
        const { rows } = await db.query(sql, [taskId]);
        return rows[0];
    },

    update: async (taskId, userId, updates) => {
        const { title, description, status } = updates;
        // Postgres doesn't work well with dynamic update sets without a builder, 
        // but for simplicity we can use COALESCE if we pass all fields, or update specific logic.
        // A better approach for raw SQL:
        const sql = `
      UPDATE tasks 
      SET title = COALESCE($1, title), 
          description = COALESCE($2, description), 
          status = COALESCE($3, status) 
      WHERE id = $4 AND user_id = $5 
      RETURNING *
    `;
        const { rowCount } = await db.query(sql, [title, description, status, taskId, userId]);
        return rowCount;
    },

    delete: async (taskId, userId) => {
        const sql = 'DELETE FROM tasks WHERE id = $1 AND user_id = $2';
        const { rowCount } = await db.query(sql, [taskId, userId]);
        return rowCount;
    }
};

module.exports = TaskModel;
