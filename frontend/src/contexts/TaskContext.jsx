import { createContext, useState, useContext, useEffect } from 'react';
import TaskService from '../services/taskService';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, limit: 6, totalPages: 1, total: 0 });
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    const fetchTasks = async (page = 1, status = 'all') => {
        if (!token) {
            setTasks([]);
            return;
        }

        try {
            setLoading(true);
            const output = await TaskService.getAll(status, page, 6);
            setTasks(output.data);
            setPagination(output.pagination);
            setFilter(status); // Keep track of current filter
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (taskData) => {
        try {
            await TaskService.create(taskData);
            // Refetch to update list and counts correctly
            fetchTasks(1, filter);
        } catch (err) {
            throw err;
        }
    };

    const updateTask = async (id, updates) => {
        try {
            await TaskService.update(id, updates);
            setTasks((prev) =>
                prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
            );
        } catch (err) {
            throw err;
        }
    };

    const deleteTask = async (id) => {
        try {
            await TaskService.delete(id);
            setTasks((prev) => prev.filter((task) => task.id !== id));
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [token]);

    return (
        <TaskContext.Provider
            value={{
                tasks,
                pagination,
                filter,
                loading,
                error,
                fetchTasks,
                addTask,
                updateTask,
                deleteTask
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
