import React, { useState, useEffect } from 'react';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import ProductGrid from './components/Products/ProductGrid';
import CartModal from './components/Cart/CartModal';
import Pagination from './components/Pagination/Pagination';
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';
import { useDarkMode } from './context/DarkModeContext';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductModal from './components/Products/ProductModal';
import LoadingSpinner from './components/LoadingSpinner';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { products, categories, loading, error } = useProducts();
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const { logout, user } = useAuth
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const productsPerPage = 8;
  const [isOpen, onCloseModal] = useState(false)
  const [product, setProduct] = useState("");

  const storedUser = localStorage.getItem('user');
  const [isUser, setIsUser] = useState(storedUser)

  useEffect(() => {
    let result = products;

    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, selectedCategory, searchQuery]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");


    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIsUser(parsedUser); // Update isUser state
      setIsAuthenticated(!!(parsedUser?.email && parsedUser?.password));
    } else {
      setIsUser(null);
      setIsAuthenticated(false);
    }
  }, [user]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = async () => {
    try {
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    logout()
    setIsAuthenticated(prevState => !prevState);;
  };



  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark-mode" : ""}`}>
      <div className={`bg-gray-100 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen`}>
        <Navbar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isAuthenticated={isAuthenticated}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          cartItems={cart}
          toggleCart={() => setShowCart(!showCart)}
        />

        <div className="pt-16 md:pl-64">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            isOpen={true}
          />

          <main className="p-6">
            <ProductGrid
              products={filteredProducts}
              currentPage={currentPage}
              productsPerPage={productsPerPage}
              onAddToCart={addToCart}
              onViewDetails={(product) => {
                onCloseModal(!isOpen);
                setProduct(product)
              }}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </main>
        </div>

        <CartModal
          isOpen={showCart}
          onClose={() => setShowCart(false)}
          items={cart}
          isAuthenticated={isAuthenticated}
          onRemoveItem={removeFromCart}

        />
        <ProductModal isOpen={isOpen} product={product} onCloseModal={onCloseModal} />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default App;
