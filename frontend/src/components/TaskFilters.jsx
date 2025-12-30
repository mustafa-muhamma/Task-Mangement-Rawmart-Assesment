const TaskFilters = ({ currentFilter, onFilterChange, showingCount, totalCount }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-xl">
                {['all', 'pending', 'done'].map((f) => (
                    <button
                        key={f}
                        onClick={() => onFilterChange(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-300 ${currentFilter === f
                                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-300 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                            }`}
                    >
                        {f === 'all' ? 'All Tasks' : f}
                    </button>
                ))}
            </div>

            <div className="text-sm text-gray-500 font-medium">
                Showing {showingCount} of {totalCount}
            </div>
        </div>
    );
};

export default TaskFilters;
