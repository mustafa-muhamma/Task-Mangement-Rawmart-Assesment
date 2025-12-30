const ItemModel = require('../models/itemModel');

const ItemController = {
    getAllItems: (req, res) => {
        ItemModel.getAll((err, rows) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: rows
            });
        });
    }
};

module.exports = ItemController;
