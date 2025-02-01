import React, { useState } from 'react';
import { Search, ShoppingCart, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './Auth/LoginModal';

const Navbar = ({
    isDarkMode,
    toggleDarkMode,
    searchQuery,
    setSearchQuery,

    cartItems,
    toggleCart
}) => {


    const [showLoginModal, setShowLoginModal] = useState(false);
    const { user, logout } = useAuth();
    return (
        <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white">EShop</h1>
                    </div>

                    <div className="flex-1 max-w-xl mx-4">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products..."
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <button
                            onClick={toggleCart}
                            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <ShoppingCart size={20} />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                    {cartItems.length}
                                </span>
                            )}
                        </button>

                        {/* <button
                            onClick={isAuthenticated ? handleLogout : handleLogin}
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        >
                            {isAuthenticated ? 'Logout' : 'Login'}
                        </button> */}


                        {!user ? (
                            <button
                                onClick={() => setShowLoginModal(true)}
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Login
                            </button>
                        ) : (
                            <button
                                onClick={logout}
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Logout
                            </button>
                        )}

                        <LoginModal
                            isOpen={showLoginModal}
                            onClose={() => setShowLoginModal(false)}
                        />

                    </div>
                </div>
            </div>
        </nav>
    );
};


export default Navbar