import { useState, useEffect } from "react";
import useFetchProducts from "../hooks/useFetchProducts"; // Custom hook to fetch products and categories
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";

const Home = () => {
    const { products, categories } = useFetchProducts(); // Fetch products and categories
    const [search, setSearch] = useState(""); // State for search input
    const [category, setCategory] = useState(""); // State for selected category

    console.log("categories=>", categories)
    // Filter products based on search query and selected category
    const filteredProducts = products.filter(
        (p) =>
            p.title.toLowerCase().includes(search.toLowerCase()) &&
            (category ? p.category === category : true)
    );

    return (
        <div className="flex flex-col md:flex-row">
            {/* Sidebar Component - Displays categories */}
            <Sidebar categories={categories} setCategory={setCategory} />

            <div className="flex-1 p-4">
                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-2 w-full rounded-md border border-gray-300"
                    />
                </div>

                {/* Product List */}
                <ProductList products={filteredProducts} />
            </div>
        </div>
    );
};

export default Home;
