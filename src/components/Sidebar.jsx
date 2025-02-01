import React from 'react';

const Sidebar = ({ categories, selectedCategory, onCategorySelect, isOpen }) => {
    return (
        <div className={`fixed left-0 top-16 h-full bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 w-64`}>
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-4 dark:text-white">Categories</h2>
                <ul className="space-y-2">
                    {categories.map((category) => (
                        <li key={category}>
                            <button
                                onClick={() => onCategorySelect(category)}
                                className={`w-full text-left px-4 py-2 rounded-lg ${selectedCategory === category
                                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                                    }`}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


export default Sidebar