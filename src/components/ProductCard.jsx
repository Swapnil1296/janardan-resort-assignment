import React from 'react';

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="relative pt-[100%]">
                <img
                    src={product.image}
                    alt={product.title}
                    className="absolute top-0 left-0 w-full h-full object-contain p-4"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">{product.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{product.category}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">${product.price}</p>
                <div className="mt-4 flex space-x-2">
                    <button
                        onClick={() => onAddToCart(product)}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Add to Cart
                    </button>
                    <button
                        onClick={() => onViewDetails(product)}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard