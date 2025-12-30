const db = require('../config/database');

const ItemModel = {
    getAll: (callback) => {
        const sql = 'SELECT * FROM items';
        db.all(sql, [], (err, rows) => {
            callback(err, rows);
        });
    },

    // Future methods can be added here (create, update, delete)
};

module.exports = ItemModel;
