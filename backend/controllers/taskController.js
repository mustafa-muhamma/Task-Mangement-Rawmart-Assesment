const TaskModel = require('../models/taskModel');

const TaskController = {
    createTask: async (req, res) => {
        try {
            const { title, description, status } = req.body;
            const userId = req.user.id;

            if (!title) {
                return res.status(400).json({ error: 'Title is required' });
            }

            const task = await TaskModel.create(userId, title, description, status);
            res.status(201).json({ message: 'Task created', data: task });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getTasks: async (req, res) => {
        try {
            const userId = req.user.id;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5; // Default limit
            const status = req.query.status || 'all';

            const offset = (page - 1) * limit;

            const result = await TaskModel.findAllByUserId(
                userId,
                { status },
                { limit, offset }
            );

            res.json({
                message: 'Success',
                data: result.tasks,
                pagination: {
                    total: result.total,
                    page,
                    limit,
                    totalPages: Math.ceil(result.total / limit)
                }
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    },

    updateTask: async (req, res) => {
        try {
            const taskId = req.params.id;
            const userId = req.user.id;
            const updates = req.body;

            const changes = await TaskModel.update(taskId, userId, updates);
            if (changes === 0) return res.status(404).json({ error: 'Task not found or unauthorized' });
            res.json({ message: 'Task updated successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteTask: async (req, res) => {
        try {
            const taskId = req.params.id;
            const userId = req.user.id;

            const changes = await TaskModel.delete(taskId, userId);
            if (changes === 0) return res.status(404).json({ error: 'Task not found or unauthorized' });
            res.json({ message: 'Task deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = TaskController;
