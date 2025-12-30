import api from '../config/api';

const TaskService = {
    getAll: async (filter = 'all', page = 1, limit = 6) => {
        const response = await api.get(`/tasks?status=${filter}&page=${page}&limit=${limit}`);
        return response.data; // Now returns { data: [], pagination: {} }
    },

    create: async (taskData) => {
        const response = await api.post('/tasks', taskData);
        return response.data.data;
    },

    update: async (id, taskData) => {
        const response = await api.put(`/tasks/${id}`, taskData);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/tasks/${id}`);
        return response.data;
    }
};

export default TaskService;
