const db = require('../config/database');
const bcrypt = require('bcryptjs');

const UserModel = {
    create: async (name, email, password) => {
        const hash = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
        const { rows } = await db.query(sql, [name, email, hash]);
        return rows[0];
    },

    findByEmail: async (email) => {
        const sql = 'SELECT * FROM users WHERE email = $1';
        const { rows } = await db.query(sql, [email]);
        return rows[0];
    },

    findById: async (id) => {
        const sql = 'SELECT id, name, email, created_at FROM users WHERE id = $1';
        const { rows } = await db.query(sql, [id]);
        return rows[0];
    }
};

module.exports = UserModel;
