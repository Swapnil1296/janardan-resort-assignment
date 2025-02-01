// src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import CartModal from './components/CartModal';
import Pagination from './components/Pagination';
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';
import { DarkModeProvider, useDarkMode } from './context/DarkModeContext';

const App = () => {
  const { products, categories, loading, error } = useProducts();
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  // const [isDarkMode, toggleDarkMode] = useState(false)

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const productsPerPage = 8;

  // Filter products based on search and category
  // src/App.jsx (continued)
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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = async () => {
    try {
      // Simulate Google login
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Please login to checkout');
      return;
    }
    // Implement checkout logic here
    alert('Thank you for your purchase!');
    clearCart();
    setShowCart(false);
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
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
                // Implement product details view
                console.log('View details:', product);
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
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
};

export default App




