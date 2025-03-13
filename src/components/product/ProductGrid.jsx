import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, onAddToCart, onAddToWishlist }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="h-full">
          <ProductCard
            product={product}
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
