import { useState } from 'react';
import { useTasks } from '../contexts/TaskContext';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import Navbar from '../components/Navbar';
import Pagination from '../components/Pagination';
import TaskFilters from '../components/TaskFilters';
import { Plus, LayoutGrid } from 'lucide-react';

const Dashboard = () => {
    const { tasks, pagination, filter, fetchTasks, loading, error } = useTasks();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    // Use pagination from context
    const { page, totalPages, total } = pagination;

    // Handlers
    const handleEdit = (task) => {
        setEditingTask(task);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingTask(null);
    };

    const handleFilterChange = (newFilter) => {
        // Reset to page 1 when filter changes
        fetchTasks(1, newFilter);
    };

    const handlePageChange = (newPage) => {
        fetchTasks(newPage, filter);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 md:px-8">
            <Navbar />

            <main className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
                            Dashboard
                        </h1>
                        <p className="text-gray-500 dark:text-gray-300 text-lg">
                            Manage your tasks efficiently.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="group flex items-center justify-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
                    >
                        <Plus size={20} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                        New Task
                    </button>
                </div>

                {/* Dashboard Card */}
                <div className="glass-card p-6 md:p-8 min-h-[600px] flex flex-col">

                    <TaskFilters
                        currentFilter={filter}
                        onFilterChange={handleFilterChange}
                        showingCount={tasks.length}
                        totalCount={total}
                    />

                    {/* Content Area */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="h-full flex flex-col items-center justify-center py-20">
                                <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                                <p className="mt-4 text-gray-500 animate-pulse">Syncing tasks...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-20">
                                <p className="text-red-500 bg-red-50 px-4 py-2 rounded-lg inline-block">{error}</p>
                            </div>
                        ) : tasks.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center py-20 text-center opacity-80">
                                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-4">
                                    <LayoutGrid size={48} className="text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">No tasks found</h3>
                                <p className="text-gray-500 max-w-sm">
                                    {filter === 'all'
                                        ? "You haven't created any tasks yet. Click 'New Task' to get started."
                                        : `No ${filter} tasks available.`}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {tasks.map((task) => (
                                    <TaskItem key={task.id} task={task} onEdit={handleEdit} />
                                ))}
                            </div>
                        )}
                    </div>

                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </main>

            {isFormOpen && (
                <TaskForm
                    taskToEdit={editingTask}
                    onClose={closeForm}
                />
            )}
        </div>
    );
};

export default Dashboard;
