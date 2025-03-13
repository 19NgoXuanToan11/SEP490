import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistItem } from "../../store/wishlistSlice";
import { toggleCompareItem } from "../../store/compareSlice";
import CompareArrows from "@mui/icons-material/CompareArrows";
import Visibility from "@mui/icons-material/Visibility";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";

const ProductCard = ({ product, onAddToCart }) => {
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

  const dispatch = useDispatch();

  // Get wishlist and compare states from Redux store
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const compareItems = useSelector((state) => state.compare.items);

  // Check if product is in wishlist
  const isInWishlist = wishlistItems.some((item) => item.id === id);

  // Check if product is in compare list
  const isInCompareList = compareItems.some((item) => item.id === id);

  // Handle wishlist toggle with toast notifications
  const handleWishlistToggle = () => {
    dispatch(toggleWishlistItem(product));

    // Show appropriate toast notification
    if (isInWishlist) {
      // If product is already in wishlist, it will be removed
      toast.info(
        <div className="flex items-center">
          <div className="mr-3 bg-blue-100 text-blue-500 rounded-full p-2">
            <FavoriteBorder fontSize="small" />
          </div>
          <div>
            <p className="font-medium">Removed from Wishlist</p>
            <p className="text-sm opacity-80">
              {name} has been removed from your wishlist
            </p>
          </div>
        </div>,
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "bg-white text-gray-800 shadow-lg rounded-lg",
          bodyClassName: "p-0",
          toastClassName: "bg-white rounded-lg shadow-lg overflow-hidden",
        }
      );
    } else {
      // If product is not in wishlist, it will be added
      toast.success(
        <div className="flex items-center">
          <div className="mr-3 bg-red-100 text-red-500 rounded-full p-2">
            <Favorite fontSize="small" />
          </div>
          <div>
            <p className="font-medium">Added to Wishlist</p>
            <p className="text-sm opacity-80">
              {name} has been added to your wishlist
            </p>
          </div>
        </div>,
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "bg-white text-gray-800 shadow-lg rounded-lg",
          bodyClassName: "p-0",
          toastClassName: "bg-white rounded-lg shadow-lg overflow-hidden",
        }
      );
    }
  };

  // Handle compare toggle
  const handleCompareToggle = () => {
    dispatch(toggleCompareItem(product));
  };

  // Create stars array based on rating
  const stars = Array.from({ length: 5 }, (_, index) => {
    const value = index + 1;
    const filled = value <= Math.floor(rating);
    const halfFilled = value === Math.ceil(rating) && !Number.isInteger(rating);

    return { filled, halfFilled };
  });

  return (
    <div className="bg-[#1e2a3b] rounded-lg overflow-hidden h-full flex flex-col">
      {/* Product image container - fixed height */}
      <div className="relative h-[220px] overflow-hidden">
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

        {/* Quick action buttons */}
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              isInWishlist
                ? "bg-red-500 text-white"
                : "bg-white text-gray-800 hover:bg-red-500 hover:text-white"
            }`}
            onClick={handleWishlistToggle}
            aria-label="Add to wishlist"
          >
            {isInWishlist ? (
              <Favorite fontSize="small" />
            ) : (
              <FavoriteBorder fontSize="small" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              isInCompareList
                ? "bg-indigo-500 text-white"
                : "bg-white text-gray-800 hover:bg-indigo-500 hover:text-white"
            }`}
            onClick={handleCompareToggle}
            aria-label="Compare"
          >
            <CompareArrows fontSize="small" />
          </motion.button>

          <Link
            to={`/products/${id}`}
            className="w-9 h-9 rounded-full bg-white text-gray-800 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors"
            aria-label="Quick view"
          >
            <Visibility fontSize="small" />
          </Link>
        </div>

        {/* Product image */}
        <Link to={`/products/${id}`}>
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </Link>
      </div>

      {/* Product info */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-indigo-400 font-semibold uppercase mb-1">
          {brand}
        </div>

        {/* Product name with fixed height */}
        <h3 className="text-white font-medium text-lg mb-2 line-clamp-2 h-[48px]">
          {name}
        </h3>

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

        {/* Spacer to push price and button to bottom */}
        <div className="flex-grow"></div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            {originalPrice ? (
              <div className="flex items-center">
                <span className="text-lg font-bold text-indigo-400">
                  ${price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through ml-2">
                  ${originalPrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-indigo-400">
                ${price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock status */}
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

        {/* Add to cart button - fixed height */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={!inStock}
          className={`w-full h-[42px] rounded-lg flex items-center justify-center transition-all ${
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
      </div>
    </div>
  );
};

export default ProductCard;
