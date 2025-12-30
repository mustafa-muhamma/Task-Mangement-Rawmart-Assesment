import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, CheckSquare } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 dark:bg-black/20 backdrop-blur-md border-b border-white/20 shadow-sm">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link
                    to="/"
                    className="flex items-center space-x-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 hover:opacity-80 transition"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 rounded-lg text-white">
                        <CheckSquare size={24} strokeWidth={3} />
                    </div>
                    <span className="tracking-tight text-gray-900 dark:text-white">TaskFlow</span>
                </Link>

                {user && (
                    <div className="flex items-center space-x-6">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-none">
                                {user.name}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {user.email}
                            </span>
                        </div>

                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white/50">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>

                        <button
                            onClick={logout}
                            className="group p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-500 hover:text-red-500 transition-all duration-300"
                            title="Logout"
                        >
                            <LogOut size={20} className="group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
