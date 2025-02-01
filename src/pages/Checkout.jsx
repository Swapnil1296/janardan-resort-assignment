import { useCart } from "../context/CartContext";
import { useState } from "react";

const Checkout = () => {
    const { cart, clearCart } = useCart();
    const [orderSuccess, setOrderSuccess] = useState(false);

    const handleCheckout = () => {
        setTimeout(() => {
            setOrderSuccess(true);
            clearCart();
        }, 1000);
    };

    if (orderSuccess) {
        return <h2 className="text-green-500 text-xl font-bold">Order Placed Successfully! 🎉</h2>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Checkout</h1>
            <h2 className="text-lg">Total: ${cart.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}</h2>
            <button onClick={handleCheckout} className="bg-green-500 text-white px-4 py-2 mt-4">
                Place Order
            </button>
        </div>
    );
};

export default Checkout;
