import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProductFilters from "../components/product/ProductFilters";
import ProductGrid from "../components/product/ProductGrid";
import ProductSort from "../components/product/ProductSort";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import products from "../data/products";
import useProductFilter from "../hooks/useProductFilter";
import ProductCard from "../components/product/ProductCard";
import ProductList from "../components/product/ProductList";
import CompareArrows from "@mui/icons-material/CompareArrows";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Visibility from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { clearCompare } from "../store/compareSlice";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [view, setView] = useState("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Sử dụng custom hook để xử lý logic lọc sản phẩm
  const {
    filters,
    updateFilter,
    handlePriceChange,
    handleConditionChange,
    handleBrandChange,
    handleSortChange,
    filteredProducts,
    resetAllFilters,
  } = useProductFilter(products);

  const dispatch = useDispatch();

  // Lấy danh sách sản phẩm so sánh từ Redux store
  const compareItems = useSelector((state) => state.compare.items);

  // Xử lý tham số URL khi trang được tải
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    if (category) {
      updateFilter("category", category);
    }

    if (search) {
      updateFilter("searchQuery", search);
    }

    // Giả lập thời gian tải
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.search]);

  // Cập nhật URL khi bộ lọc thay đổi
  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (filters.category !== "All Categories") {
      searchParams.set("category", filters.category);
    }

    if (filters.searchQuery) {
      searchParams.set("search", filters.searchQuery);
    }

    const newUrl = searchParams.toString()
      ? `${location.pathname}?${searchParams.toString()}`
      : location.pathname;

    navigate(newUrl, { replace: true });
  }, [filters.category, filters.searchQuery]);

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
    // Thêm logic thêm vào giỏ hàng ở đây
  };

  // Xử lý thêm vào wishlist
  const handleAddToWishlist = (product) => {
    console.log("Adding to wishlist:", product);
    // Thêm logic thêm vào wishlist ở đây
  };

  // Xử lý thay đổi danh mục
  const handleCategoryChange = (category) => {
    updateFilter("category", category);
  };

  // Xử lý thay đổi chế độ xem
  const handleViewChange = (newView) => {
    setView(newView);
  };

  // Mở modal so sánh sản phẩm
  const openCompareModal = () => {
    setShowCompareModal(true);
  };

  // Đóng modal so sánh sản phẩm
  const closeCompareModal = () => {
    setShowCompareModal(false);
  };

  // Xóa tất cả sản phẩm so sánh
  const handleClearCompare = () => {
    dispatch(clearCompare());
    closeCompareModal();
  };

  // Thêm sản phẩm vào giỏ hàng từ modal so sánh
  const handleAddToCartFromCompare = (product) => {
    handleAddToCart(product);
    console.log(`Added ${product.name} to cart from compare modal`);
  };

  return (
    <>
      <Header />

      <main className="bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hiển thị banner so sánh sản phẩm khi có sản phẩm được chọn */}
          {compareItems.length > 0 && (
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 mb-6 shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="bg-white text-indigo-600 rounded-full w-10 h-10 flex items-center justify-center mr-4 shadow-md">
                    <CompareArrows />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      Compare Products
                    </h3>
                    <p className="text-indigo-100">
                      {compareItems.length}{" "}
                      {compareItems.length === 1 ? "product" : "products"}{" "}
                      selected
                    </p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleClearCompare}
                    className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg transition-colors shadow-md flex items-center"
                  >
                    <DeleteIcon className="mr-2" fontSize="small" />
                    Clear All
                  </button>
                  <button
                    onClick={openCompareModal}
                    className="px-4 py-2 bg-white text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors shadow-md flex items-center font-medium"
                  >
                    <Visibility className="mr-2" fontSize="small" />
                    View Comparison
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Product sorting and view options */}
          <ProductSort
            sortBy={filters.sortBy}
            onSortChange={handleSortChange}
            totalProducts={filteredProducts.length}
            currentView={view}
            onViewChange={handleViewChange}
            onOpenMobileFilters={() => setMobileFiltersOpen(true)}
          />

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar filters */}
            <div className="w-full md:w-64 flex-shrink-0">
              <ProductFilters
                filters={filters}
                handleCategoryChange={handleCategoryChange}
                handlePriceChange={handlePriceChange}
                handleConditionChange={handleConditionChange}
                handleBrandChange={handleBrandChange}
                resetFilters={resetAllFilters}
                mobileFiltersOpen={mobileFiltersOpen}
                setMobileFiltersOpen={setMobileFiltersOpen}
              />
            </div>

            {/* Product grid */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center items-center h-96"
                  >
                    <div className="relative w-20 h-20">
                      <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 dark:border-indigo-900 rounded-full animate-ping"></div>
                      <div className="absolute top-0 left-0 w-full h-full border-4 border-t-indigo-600 rounded-full animate-spin"></div>
                    </div>
                  </motion.div>
                ) : filteredProducts.length > 0 ? (
                  <motion.div
                    key="products"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div
                      className={
                        view === "grid"
                          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                          : "space-y-6"
                      }
                    >
                      {filteredProducts.map((product) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {view === "grid" ? (
                            <ProductCard
                              product={product}
                              onAddToCart={handleAddToCart}
                              onAddToWishlist={handleAddToWishlist}
                            />
                          ) : (
                            <ProductList
                              product={product}
                              onAddToCart={handleAddToCart}
                              onAddToWishlist={handleAddToWishlist}
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center"
                  >
                    <svg
                      className="w-16 h-16 text-gray-400 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Try adjusting your filters or search criteria to find what
                      you're looking for.
                    </p>
                    <button
                      onClick={resetAllFilters}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Reset All Filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal so sánh sản phẩm */}
      <AnimatePresence>
        {showCompareModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCompareModal}
          >
            <motion.div
              className="bg-[#111827] rounded-xl w-full max-w-6xl max-h-[90vh] overflow-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#111827] p-6 border-b border-gray-700 flex justify-between items-center z-10">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <CompareArrows className="mr-3" />
                  Product Comparison
                </h2>
                <button
                  onClick={closeCompareModal}
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-colors"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {compareItems.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-6 text-gray-400">
                      <CompareArrows
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">
                      No products to compare
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Add some products to compare by clicking the compare
                      button on product cards.
                    </p>
                    <button
                      onClick={closeCompareModal}
                      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {compareItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="bg-[#1e293b] rounded-xl overflow-hidden shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {/* Product Header */}
                        <div className="relative">
                          <div className="bg-[#1e293b] p-3 flex justify-between items-center">
                            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                              {item.brand}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch({
                                  type: "compare/toggleCompareItem",
                                  payload: item,
                                });
                              }}
                              className="w-8 h-8 rounded-full bg-gray-700 hover:bg-red-500 flex items-center justify-center text-white transition-colors"
                            >
                              <CloseIcon fontSize="small" />
                            </button>
                          </div>

                          {/* Product Image */}
                          <div className="h-48 flex items-center justify-center p-4 bg-gradient-to-b from-[#1e293b] to-[#111827]">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full object-contain"
                            />
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-5">
                          <h3 className="text-white font-medium text-lg mb-3 line-clamp-2 h-[48px]">
                            {item.name}
                          </h3>

                          <div className="flex items-center justify-between mb-4">
                            <div className="flex flex-col">
                              <div className="text-xl font-bold text-indigo-400">
                                ${item.price.toFixed(2)}
                              </div>
                              {item.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  ${item.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>

                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(item.rating)
                                      ? "text-yellow-400"
                                      : i === Math.floor(item.rating) &&
                                        !Number.isInteger(item.rating)
                                      ? "text-yellow-400"
                                      : "text-gray-600"
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="text-xs text-gray-400 ml-1">
                                ({item.reviewCount})
                              </span>
                            </div>
                          </div>

                          {/* Product Specs */}
                          <div className="space-y-3 mb-5">
                            <div className="flex justify-between py-2 border-b border-gray-700">
                              <span className="text-gray-400">
                                Availability
                              </span>
                              <span
                                className={
                                  item.inStock
                                    ? "text-green-400 font-medium"
                                    : "text-red-400 font-medium"
                                }
                              >
                                {item.inStock ? "In Stock" : "Out of Stock"}
                              </span>
                            </div>

                            {item.discount && (
                              <div className="flex justify-between py-2 border-b border-gray-700">
                                <span className="text-gray-400">Discount</span>
                                <span className="text-green-400 font-medium">
                                  {item.discount}% Off
                                </span>
                              </div>
                            )}

                            <div className="flex justify-between py-2 border-b border-gray-700">
                              <span className="text-gray-400">Category</span>
                              <span className="text-white">
                                {item.category || "Electronics"}
                              </span>
                            </div>

                            <div className="flex justify-between py-2 border-b border-gray-700">
                              <span className="text-gray-400">Condition</span>
                              <span className="text-white">
                                {item.condition || "New"}
                              </span>
                            </div>

                            <div className="flex justify-between py-2 border-b border-gray-700">
                              <span className="text-gray-400">Model</span>
                              <span className="text-white">
                                {item.model || "N/A"}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={() => handleAddToCartFromCompare(item)}
                              disabled={!item.inStock}
                              className={`h-11 rounded-lg flex items-center justify-center transition-all ${
                                item.inStock
                                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
                              }`}
                            >
                              <ShoppingCart className="mr-2" fontSize="small" />
                              Add to Cart
                            </button>

                            <Link
                              to={`/products/${item.id}`}
                              className="h-11 rounded-lg border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-colors flex items-center justify-center"
                            >
                              <Visibility className="mr-2" fontSize="small" />
                              Details
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bảng so sánh chi tiết - hiển thị khi có từ 2 sản phẩm trở lên */}
              {compareItems.length >= 2 && (
                <div className="p-6 border-t border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Detailed Comparison
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="p-3 text-gray-400 font-medium">
                            Feature
                          </th>
                          {compareItems.map((item) => (
                            <th
                              key={`header-${item.id}`}
                              className="p-3 text-white font-medium"
                            >
                              {item.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Hàng giá */}
                        <tr className="border-b border-gray-700">
                          <td className="p-3 text-gray-400">Price</td>
                          {compareItems.map((item) => (
                            <td
                              key={`price-${item.id}`}
                              className="p-3 text-white"
                            >
                              ${item.price.toFixed(2)}
                            </td>
                          ))}
                        </tr>

                        {/* Hàng thương hiệu */}
                        <tr className="border-b border-gray-700">
                          <td className="p-3 text-gray-400">Brand</td>
                          {compareItems.map((item) => (
                            <td
                              key={`brand-${item.id}`}
                              className="p-3 text-white"
                            >
                              {item.brand}
                            </td>
                          ))}
                        </tr>

                        {/* Hàng danh mục */}
                        <tr className="border-b border-gray-700">
                          <td className="p-3 text-gray-400">Category</td>
                          {compareItems.map((item) => (
                            <td
                              key={`category-${item.id}`}
                              className="p-3 text-white"
                            >
                              {item.category}
                            </td>
                          ))}
                        </tr>

                        {/* Hàng đánh giá */}
                        <tr className="border-b border-gray-700">
                          <td className="p-3 text-gray-400">Rating</td>
                          {compareItems.map((item) => (
                            <td
                              key={`rating-${item.id}`}
                              className="p-3 text-white"
                            >
                              <div className="flex items-center">
                                <div className="flex mr-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < Math.floor(item.rating)
                                          ? "text-yellow-400"
                                          : i === Math.floor(item.rating) &&
                                            !Number.isInteger(item.rating)
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
                                  ({item.reviewCount})
                                </span>
                              </div>
                            </td>
                          ))}
                        </tr>

                        {/* Hàng tình trạng kho */}
                        <tr className="border-b border-gray-700">
                          <td className="p-3 text-gray-400">Availability</td>
                          {compareItems.map((item) => (
                            <td key={`stock-${item.id}`} className="p-3">
                              <span
                                className={
                                  item.inStock
                                    ? "text-green-400 font-medium"
                                    : "text-red-400 font-medium"
                                }
                              >
                                {item.inStock ? "In Stock" : "Out of Stock"}
                              </span>
                            </td>
                          ))}
                        </tr>

                        {/* Hàng điều kiện */}
                        <tr className="border-b border-gray-700">
                          <td className="p-3 text-gray-400">Condition</td>
                          {compareItems.map((item) => (
                            <td
                              key={`condition-${item.id}`}
                              className="p-3 text-white"
                            >
                              {item.condition || "New"}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-[#111827] p-6 border-t border-gray-700 flex justify-between items-center">
                <button
                  onClick={handleClearCompare}
                  className="px-5 py-2.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors flex items-center"
                >
                  <DeleteIcon className="mr-2" fontSize="small" />
                  Clear All
                </button>

                <button
                  onClick={closeCompareModal}
                  className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nút so sánh cố định ở góc màn hình khi có sản phẩm để so sánh */}
      {compareItems.length > 0 && (
        <button
          onClick={openCompareModal}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full p-4 shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
        >
          <div className="relative">
            <CompareArrows />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {compareItems.length}
            </span>
          </div>
        </button>
      )}
    </>
  );
};

export default Products;
