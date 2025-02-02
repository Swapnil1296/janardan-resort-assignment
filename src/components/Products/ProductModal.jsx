import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductModal = ({ product, isOpen, onCloseModal }) => {
    if (!product || !isOpen) return null;

    // Close modal on Escape key press
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") onCloseModal();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onCloseModal]);

    // Handle Buy Now Click
    const handleBuyNow = () => {
        toast.success("Added to cart successfully!", { position: "top-right" });
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={() => onCloseModal()}
        >
            <div
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl w-96 h-[500px] relative flex flex-col animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500 text-3xl font-bold"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling
                        onCloseModal();
                    }}
                >
                    &times;
                </button>

                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-56 object-contain rounded-lg"
                />

                <div className="mt-4 flex-1 overflow-auto">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{product.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm line-clamp-3">{product.description}</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200 mt-3">${product.price}</p>
                    <p className="text-sm text-gray-500">
                        Category: <span className="font-medium">{product.category}</span>
                    </p>

                    <div className="flex items-center mt-2">
                        <span className="text-yellow-500 font-bold">{product.rating.rate} ★</span>
                        <span className="text-gray-500 text-sm ml-2">({product.rating.count} reviews)</span>
                    </div>
                </div>

                <button
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg"
                    onClick={handleBuyNow}
                >
                    Buy Now
                </button>
            </div>

            <ToastContainer />
        </div>
    );
};

export default ProductModal;
