import React from 'react';
import { X } from 'lucide-react';

const CartModal = ({ isOpen, onClose, items, onRemoveItem, onCheckout }) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
            <div className="absolute right-0 top-0 h-full w-96 bg-white dark:bg-gray-800 shadow-lg">
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                    <h2 className="text-lg font-semibold dark:text-white">Shopping Cart</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                    {items.length === 0 ? (
                        <p className="text-center text-gray-500 dark:text-gray-400">Your cart is empty</p>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4">
                                <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium dark:text-white">{item.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        ${item.price} x {item.quantity}
                                    </p>
                                </div>
                                <button
                                    onClick={() => onRemoveItem(item.id)}
                                    className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
                        <div className="flex justify-between mb-4">
                            <span className="font-semibold dark:text-white">Total:</span>
                            <span className="font-semibold dark:text-white">${total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={onCheckout}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartModal