import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductList = ({ product, onAddToCart, onAddToWishlist }) => {
  const {
    id,
    name,
    brand,
    price,
    originalPrice,
    rating,
    reviewCount,
    inStock,
    image,
    discount,
    isNew,
  } = product;

  // Tạo mảng sao dựa trên rating
  const stars = Array.from({ length: 5 }, (_, index) => {
    const value = index + 1;
    const filled = value <= Math.floor(rating);
    const halfFilled = value === Math.ceil(rating) && !Number.isInteger(rating);

    return { filled, halfFilled };
  });

  return (
    <div className="bg-[#1e2a3b] rounded-lg overflow-hidden flex flex-col md:flex-row">
      {/* Product image container */}
      <div className="relative h-[220px] md:w-[220px] md:min-w-[220px] overflow-hidden">
        {/* Discount badge */}
        {discount && (
          <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </div>
        )}

        {/* New badge */}
        {isNew && (
          <div className="absolute top-3 right-3 z-10 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            NEW
          </div>
        )}

        {/* Product image */}
        <Link to={`/products/${id}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
      </div>

      {/* Product info */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          <div>
            <div className="text-xs text-indigo-400 font-semibold uppercase mb-1">
              {brand}
            </div>
            <Link to={`/products/${id}`}>
              <h3 className="text-white font-medium text-lg mb-2 hover:text-indigo-400 transition-colors">
                {name}
              </h3>
            </Link>

            {/* Rating */}
            <div className="flex items-center mb-3">
              <div className="flex mr-1">
                {stars.map((star, index) => (
                  <svg
                    key={index}
                    className={`w-4 h-4 ${
                      star.filled
                        ? "text-yellow-400"
                        : star.halfFilled
                        ? "text-yellow-400"
                        : "text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-400">({reviewCount})</span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-3 md:mb-0">
            {originalPrice ? (
              <div className="flex items-center">
                <span className="text-xl font-bold text-indigo-400">
                  ${price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through ml-2">
                  ${originalPrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-indigo-400">
                ${price.toFixed(2)}
              </span>
            )}

            {/* Stock status */}
            <div className="mt-2">
              {inStock ? (
                <div className="flex items-center text-green-400 text-xs">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>In Stock</span>
                </div>
              ) : (
                <div className="flex items-center text-red-400 text-xs">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Out of Stock</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product description - chỉ hiển thị trong list view */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {product.description ||
            "High-quality tech product with advanced features and reliable performance. Perfect for everyday use."}
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-auto">
          <button
            onClick={() => onAddToCart(product)}
            disabled={!inStock}
            className={`flex-1 h-[42px] rounded-lg flex items-center justify-center transition-all ${
              inStock
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => onAddToWishlist(product)}
              className="h-[42px] px-4 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors flex items-center justify-center"
              aria-label="Add to wishlist"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            <button
              className="h-[42px] px-4 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors flex items-center justify-center"
              aria-label="Compare"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </button>

            <Link
              to={`/products/${id}`}
              className="h-[42px] px-4 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors flex items-center justify-center"
              aria-label="View details"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
