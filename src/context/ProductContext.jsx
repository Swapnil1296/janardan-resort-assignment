import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="border p-4 rounded shadow">
            <img src={product.image} alt={product.title} className="h-40 mx-auto" />
            <h3 className="font-bold">{product.title}</h3>
            <p>${product.price}</p>
            <button
                className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
                onClick={() => addToCart(product)}
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
