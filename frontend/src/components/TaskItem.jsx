import { Trash2, CheckCircle, Circle, Edit3, Clock, Calendar } from 'lucide-react';
import { useTasks } from '../contexts/TaskContext';

const TaskItem = ({ task, onEdit }) => {
    const { updateTask, deleteTask } = useTasks();

    const handleStatusToggle = (e) => {
        e.stopPropagation();
        const newStatus = task.status === 'done' ? 'pending' : 'done';
        updateTask(task.id, { status: newStatus });
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this task?')) {
            deleteTask(task.id);
        }
    };

    // Format date if available (assuming created_at exists)
    const date = task.created_at ? new Date(task.created_at).toLocaleDateString() : 'Today';

    return (
        <div className="group relative bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 flex flex-col justify-between h-full">

            {/* Header & Status */}
            <div className="flex justify-between items-start mb-3">
                <div className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${task.status === 'done'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                    {task.status}
                </div>

                <div className="flex space-x-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit(task); }}
                        className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition"
                    >
                        <Edit3 size={16} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="mb-4">
                <h3 className={`font-bold text-lg mb-1 leading-snug ${task.status === 'done' ? 'text-gray-400 line-through decoration-2 decoration-gray-300' : 'text-gray-800 dark:text-gray-100'}`}>
                    {task.title}
                </h3>
                {task.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {task.description}
                    </p>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                <div className="flex items-center text-xs text-gray-400 font-medium">
                    <Calendar size={12} className="mr-1" />
                    {date}
                </div>

                <button
                    onClick={handleStatusToggle}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors duration-200 ${task.status === 'done'
                        ? 'bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                >
                    {task.status === 'done' ? (
                        <>
                            <CheckCircle size={16} /> <span>Completed</span>
                        </>
                    ) : (
                        <>
                            <Circle size={16} /> <span>Mark Done</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
