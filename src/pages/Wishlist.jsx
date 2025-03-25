import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearWishlist, toggleWishlistItem } from "../store/wishlistSlice";
import ProductCard from "../components/product/ProductCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  GridView as GridViewIcon,
  ViewList as ViewListIcon,
  ArrowUpward as ArrowUpwardIcon,
  Delete as DeleteIcon,
  Sort as SortIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [view, setView] = useState("grid"); // grid or list view
  const [sortOption, setSortOption] = useState("dateAdded"); // default sort
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    // Implement your add to cart functionality
    console.log("Added to cart:", product);
  };

  // Handle remove from wishlist with toast notification
  const handleRemoveFromWishlist = (product) => {
    dispatch(toggleWishlistItem(product));

    // Show toast notification
    toast.success(
      <div className="flex items-center">
        <FavoriteIcon className="mr-2 text-red-500" fontSize="small" />
        <div>
          <p className="font-medium">Removed from Wishlist</p>
          <p className="text-sm opacity-80">
            {product.name} has been removed from your wishlist
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
        className: "bg-[#1e2a3b] text-white border border-gray-700",
      }
    );
  };

  // Handle clear all wishlist items with toast notification
  const handleClearWishlist = () => {
    dispatch(clearWishlist());

    // Show toast notification
    toast.info(
      <div className="flex items-center">
        <DeleteIcon className="mr-2 text-red-400" fontSize="small" />
        <div>
          <p className="font-medium">Wishlist Cleared</p>
          <p className="text-sm opacity-80">
            All items have been removed from your wishlist
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
        className: "bg-[#1e2a3b] text-white border border-gray-700",
      }
    );
  };

  // Sort wishlist items
  const sortedWishlistItems = [...wishlistItems].sort((a, b) => {
    switch (sortOption) {
      case "priceAsc":
        return a.price - b.price;
      case "priceDesc":
        return b.price - a.price;
      case "nameAsc":
        return a.name.localeCompare(b.name);
      case "nameDesc":
        return b.name.localeCompare(a.name);
      case "rating":
        return b.rating - a.rating;
      default: // dateAdded
        return new Date(b.dateAdded) - new Date(a.dateAdded);
    }
  });

  return (
    <>
      <Header />

      <main className="bg-[#0f172a] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {wishlistItems.length > 0 ? (
            <>
              {/* Controls bar */}
              <div className="bg-[#1e2a3b] rounded-lg p-4 mb-6 flex flex-wrap justify-between items-center">
                <div className="flex items-center">
                  <span className="text-gray-400 mr-3">View:</span>
                  <div className="flex bg-[#273548] rounded-lg p-1">
                    <button
                      onClick={() => setView("grid")}
                      className={`p-2 rounded-md transition-colors ${
                        view === "grid"
                          ? "bg-indigo-600 text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                      aria-label="Grid view"
                    >
                      <GridViewIcon fontSize="small" />
                    </button>
                    <button
                      onClick={() => setView("list")}
                      className={`p-2 rounded-md transition-colors ${
                        view === "list"
                          ? "bg-indigo-600 text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                      aria-label="List view"
                    >
                      <ViewListIcon fontSize="small" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <span className="text-gray-400 mr-3">Sort by:</span>
                  <div className="relative">
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="bg-[#273548] text-white border border-gray-700 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                    >
                      <option value="dateAdded">Date Added</option>
                      <option value="priceAsc">Price: Low to High</option>
                      <option value="priceDesc">Price: High to Low</option>
                      <option value="nameAsc">Name: A to Z</option>
                      <option value="nameDesc">Name: Z to A</option>
                      <option value="rating">Rating</option>
                    </select>
                    <SortIcon
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                      fontSize="small"
                    />
                  </div>
                </div>
              </div>

              {/* Products display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key="products"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {view === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sortedWishlistItems.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <ProductCard
                            product={product}
                            onAddToCart={handleAddToCart}
                            onRemoveFromWishlist={() =>
                              handleRemoveFromWishlist(product)
                            }
                          />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {sortedWishlistItems.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="bg-[#1e2a3b] rounded-lg overflow-hidden shadow-lg border border-gray-800"
                        >
                          <div className="flex flex-col md:flex-row">
                            {/* Product image */}
                            <div className="md:w-1/4 h-[200px] md:h-auto relative">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                              {product.discount && (
                                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                  -{product.discount}%
                                </div>
                              )}
                              {product.isNew && (
                                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                  NEW
                                </div>
                              )}
                            </div>

                            {/* Product details */}
                            <div className="p-6 md:w-3/4 flex flex-col">
                              <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <div className="text-xs text-indigo-400 font-semibold uppercase mb-1">
                                      {product.brand}
                                    </div>
                                    <h3 className="text-white font-medium text-xl mb-2">
                                      {product.name}
                                    </h3>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="flex mr-1">
                                      {Array.from({ length: 5 }).map((_, i) => (
                                        <svg
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < Math.floor(product.rating)
                                              ? "text-yellow-400"
                                              : i ===
                                                  Math.floor(product.rating) &&
                                                !Number.isInteger(
                                                  product.rating
                                                )
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
                                    <span className="text-xs text-gray-400">
                                      ({product.reviewCount})
                                    </span>
                                  </div>
                                </div>

                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                  {product.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                  <span className="bg-[#273548] text-gray-300 text-xs px-3 py-1 rounded-full">
                                    {product.category}
                                  </span>
                                  <span className="bg-[#273548] text-gray-300 text-xs px-3 py-1 rounded-full">
                                    {product.condition}
                                  </span>
                                  {product.inStock ? (
                                    <span className="bg-green-900 text-green-300 text-xs px-3 py-1 rounded-full">
                                      In Stock
                                    </span>
                                  ) : (
                                    <span className="bg-red-900 text-red-300 text-xs px-3 py-1 rounded-full">
                                      Out of Stock
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex justify-between items-center">
                                <div>
                                  {product.originalPrice ? (
                                    <div className="flex items-center">
                                      <span className="text-xl font-bold text-indigo-400">
                                        ${product.price.toFixed(2)}
                                      </span>
                                      <span className="text-sm text-gray-500 line-through ml-2">
                                        ${product.originalPrice.toFixed(2)}
                                      </span>
                                    </div>
                                  ) : (
                                    <span className="text-xl font-bold text-indigo-400">
                                      ${product.price.toFixed(2)}
                                    </span>
                                  )}
                                </div>

                                <div className="flex gap-2">
                                  <button
                                    onClick={() =>
                                      handleRemoveFromWishlist(product)
                                    }
                                    className="h-[42px] px-4 rounded-lg border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center"
                                  >
                                    <DeleteIcon
                                      className="mr-2"
                                      fontSize="small"
                                    />
                                    Remove
                                  </button>

                                  <button
                                    onClick={() => handleAddToCart(product)}
                                    disabled={!product.inStock}
                                    className={`h-[42px] px-6 rounded-lg flex items-center justify-center transition-all ${
                                      product.inStock
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
                                    {product.inStock
                                      ? "Add to Cart"
                                      : "Out of Stock"}
                                  </button>

                                  <Link
                                    to={`/products/${product.id}`}
                                    className="h-[42px] px-4 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors flex items-center justify-center"
                                  >
                                    Details
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#1e2a3b] rounded-xl overflow-hidden shadow-xl border border-gray-800"
            >
              <div className="text-center py-16 px-4">
                <div className="w-20 h-20 mx-auto bg-[#0f172a] rounded-full flex items-center justify-center mb-6">
                  <FavoriteBorderIcon
                    style={{ fontSize: 40 }}
                    className="text-red-500"
                  />
                </div>

                <h2 className="text-2xl font-bold text-white mb-3">
                  Your wishlist is empty
                </h2>

                <p className="text-gray-400 max-w-md mx-auto mb-8">
                  Save your favorite items to your wishlist and come back to
                  them anytime. Start exploring our products to find something
                  you'll love!
                </p>

                <Link
                  to="/products"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
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
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                  Explore Products
                </Link>
              </div>

              <div className="h-24 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 flex items-center justify-center">
                <p className="text-gray-500 text-sm">
                  Products you add to your wishlist will appear here
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors z-50"
            aria-label="Scroll to top"
          >
            <ArrowUpwardIcon />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: "#1e2a3b",
          color: "white",
          borderRadius: "8px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      />

      <Footer />
    </>
  );
};

export default Wishlist;
