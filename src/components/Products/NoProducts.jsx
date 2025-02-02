import { FaBoxOpen } from "react-icons/fa";

const NoProducts = () => {
    return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-600">
            <FaBoxOpen className="text-6xl mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold">No Products Available</h2>
            <p className="text-gray-500">Please check back later or explore other categories.</p>
        </div>
    );
};

export default NoProducts;
