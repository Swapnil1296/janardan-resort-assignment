import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center space-x-2 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border dark:border-gray-600 disabled:opacity-50"
            >
                Previous
            </button>
            <span className="px-4 py-2 dark:text-white">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border dark:border-gray-600 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination