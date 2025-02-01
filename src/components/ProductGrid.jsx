import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({
    products,
    currentPage,
    productsPerPage,
    onAddToCart,
    onViewDetails
}) => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onViewDetails={onViewDetails}
                />
            ))}
        </div>
    );
};

export default ProductGrid