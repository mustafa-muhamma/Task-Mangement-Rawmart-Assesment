import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex items-center justify-center p-6 transition-colors duration-300">
            <div className="max-w-md w-full glass p-8 rounded-2xl text-center space-y-6 animate-fade-in-up">

                {/* Icon */}
                <div className="mx-auto w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-500 dark:text-red-400">
                    <AlertTriangle size={40} />
                </div>

                {/* Text */}
                <div>
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">404</h1>
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Page Not Found</h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        The page you are looking for doesn't exist or has been moved.
                    </p>
                </div>

                {/* Button */}
                <Link
                    to="/"
                    className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
                >
                    <Home size={18} />
                    <span>Back to Home</span>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
