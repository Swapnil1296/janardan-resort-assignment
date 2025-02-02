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
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{product.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
                <p className="text-base font-bold text-gray-900 dark:text-white mt-2">${product.price}</p>
                <div className="mt-3 flex space-x-2">
                    <button
                        onClick={() => onAddToCart(product)}
                        className="flex-1 px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
                    >
                        Add to Cart
                    </button>
                    <button
                        onClick={() => onViewDetails(product)}
                        className="flex-1 px-3 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700 transition"
                    >
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
