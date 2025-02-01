import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, removeFromCart, updateQty, clearCart } = useCart();

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center border p-2 my-2">
                            <img src={item.image} alt={item.title} className="h-16" />
                            <h3>{item.title}</h3>
                            <input
                                type="number"
                                value={item.qty}
                                onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                                className="w-12 border"
                            />
                            <p>${(item.price * item.qty).toFixed(2)}</p>
                            <button onClick={() => removeFromCart(item.id)} className="bg-red-500 px-2 py-1 text-white">
                                Remove
                            </button>
                        </div>
                    ))}
                    <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
                    <button onClick={clearCart} className="bg-gray-500 text-white px-4 py-2 rounded">
                        Clear Cart
                    </button>
                    <Link to="/checkout">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
                            Checkout
                        </button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default Cart;
