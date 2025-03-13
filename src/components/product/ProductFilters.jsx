// src/components/product/ProductFilters.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Tune as TuneIcon,
  Refresh as RefreshIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { brands, categories, conditions } from "../../data/products";

const ProductFilters = ({
  filters,
  handleCategoryChange,
  handlePriceChange,
  handleConditionChange,
  handleBrandChange,
  resetFilters,
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    condition: true,
    brands: true,
  });
  const [searchBrand, setSearchBrand] = useState("");

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Lọc thương hiệu theo từ khóa tìm kiếm
  const filteredBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(searchBrand.toLowerCase())
  );

  const FilterSection = ({ title, id, icon, children, expanded }) => (
    <div className="border-b border-gray-700/30 py-4">
      <motion.button
        whileHover={{ x: 3 }}
        className="flex items-center justify-between w-full text-left group"
        onClick={() => toggleSection(id)}
      >
        <div className="flex items-center">
          {icon && <span className="mr-2 text-indigo-400">{icon}</span>}
          <h3 className="text-gray-200 font-medium group-hover:text-indigo-400 transition-colors">
            {title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400 group-hover:text-indigo-400 transition-colors"
        >
          <ExpandMoreIcon fontSize="small" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      {/* Mobile filter dialog */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center text-white bg-[#1a2234] hover:bg-[#232d42] px-4 py-2.5 rounded-lg shadow-sm transition-colors"
        >
          <FilterIcon className="mr-2 text-indigo-400" />
          <span>Filters</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={resetFilters}
          className="flex items-center text-indigo-400 hover:text-indigo-300 text-sm font-medium"
        >
          <RefreshIcon fontSize="small" className="mr-1" />
          <span>Reset</span>
        </motion.button>
      </div>

      {/* Mobile filter sidebar */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setMobileFiltersOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-md bg-[#1a2234] shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-4 border-b border-gray-700/30 flex items-center justify-between sticky top-0 bg-[#1a2234] z-10">
                <div className="flex items-center">
                  <TuneIcon className="mr-2 text-indigo-400" />
                  <h2 className="text-lg font-semibold text-white">Filters</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-700/30 text-gray-400 hover:text-white transition-colors"
                >
                  <CloseIcon />
                </motion.button>
              </div>

              <div className="p-4">
                {/* Filter sections for mobile */}
                <FilterSection
                  title="Categories"
                  id="categories"
                  icon={<CategoryIcon />}
                  expanded={expandedSections.categories}
                >
                  <div className="bg-[#131c2b] rounded-lg p-1 mt-2">
                    <select
                      className="w-full p-3 bg-transparent text-gray-200 appearance-none focus:outline-none"
                      value={filters.category}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                    >
                      {categories.map((category) => (
                        <option
                          key={category}
                          value={category}
                          className="bg-[#1a2234] text-gray-200"
                        >
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </FilterSection>

                <FilterSection
                  title="Price Range"
                  id="price"
                  icon={<PriceIcon />}
                  expanded={expandedSections.price}
                >
                  <div className="px-2 py-4">
                    <div className="flex justify-between mb-2 text-sm text-gray-400">
                      <span>${filters.priceRange[0]}</span>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                    <div className="relative mb-6">
                      {/* Thanh nền */}
                      <div className="h-1 w-full bg-gray-700 rounded-full"></div>

                      {/* Thanh trượt đơn giản hơn - chỉ điều chỉnh giá tối đa */}
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="10"
                        value={filters.priceRange[1]}
                        onChange={(e) =>
                          handlePriceChange([
                            filters.priceRange[0],
                            parseInt(e.target.value),
                          ])
                        }
                        className="absolute top-0 w-full h-1 appearance-none bg-transparent pointer-events-auto z-10"
                        style={{
                          WebkitAppearance: "none",
                        }}
                      />

                      {/* Phần màu đã chọn */}
                      <div
                        className="absolute h-1 bg-indigo-500 rounded-full"
                        style={{
                          width: `${(filters.priceRange[1] / 2000) * 100}%`,
                          left: 0,
                          top: "0",
                        }}
                      ></div>

                      {/* Chỉ giữ lại một nút điều khiển ở cuối */}
                      <div
                        className="absolute w-5 h-5 bg-indigo-500 rounded-full shadow-md flex items-center justify-center z-20"
                        style={{
                          left: `${(filters.priceRange[1] / 2000) * 100}%`,
                          top: "0",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </FilterSection>

                <FilterSection
                  title="Condition"
                  id="condition"
                  icon={<ConditionIcon />}
                  expanded={expandedSections.condition}
                >
                  <div className="space-y-2 mt-2">
                    {conditions.map((condition) => (
                      <motion.div
                        key={condition}
                        whileHover={{ x: 3 }}
                        className="flex items-center p-2 rounded-lg hover:bg-[#232d42] transition-colors"
                      >
                        <div
                          className="w-5 h-5 rounded flex items-center justify-center mr-3 text-indigo-400"
                          onClick={() => handleConditionChange(condition)}
                        >
                          {filters.condition.includes(condition) ? (
                            <CheckCircleIcon fontSize="small" />
                          ) : (
                            <RadioButtonUncheckedIcon fontSize="small" />
                          )}
                        </div>
                        <label
                          onClick={() => handleConditionChange(condition)}
                          className="flex-1 text-gray-200 cursor-pointer"
                        >
                          {condition}
                        </label>
                      </motion.div>
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Brands"
                  id="brands"
                  icon={<BrandIcon />}
                  expanded={expandedSections.brands}
                >
                  <div className="mt-2">
                    <div className="relative mb-3">
                      <input
                        type="text"
                        placeholder="Search brands..."
                        value={searchBrand}
                        onChange={(e) => setSearchBrand(e.target.value)}
                        className="w-full p-2 pl-9 bg-[#131c2b] border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-indigo-500"
                      />
                      <SearchIcon
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                        fontSize="small"
                      />
                    </div>
                    <div className="space-y-1 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                      {filteredBrands.map((brand) => (
                        <motion.div
                          key={brand}
                          whileHover={{ x: 3 }}
                          className="flex items-center p-2 rounded-lg hover:bg-[#232d42] transition-colors"
                        >
                          <div
                            className="w-5 h-5 rounded flex items-center justify-center mr-3 text-indigo-400"
                            onClick={() => handleBrandChange(brand)}
                          >
                            {filters.brands.includes(brand) ? (
                              <CheckCircleIcon fontSize="small" />
                            ) : (
                              <RadioButtonUncheckedIcon fontSize="small" />
                            )}
                          </div>
                          <label
                            onClick={() => handleBrandChange(brand)}
                            className="flex-1 text-gray-200 cursor-pointer"
                          >
                            {brand}
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </FilterSection>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetFilters}
                  className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <RefreshIcon className="mr-2" />
                  Reset All Filters
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop filters */}
      <div className="hidden md:block bg-[#1a2234] rounded-xl shadow-md p-5 border border-gray-700/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FilterIcon className="mr-2 text-indigo-400" />
            <h2 className="text-xl font-semibold text-white">Filters</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetFilters}
            className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center"
          >
            <RefreshIcon fontSize="small" className="mr-1" />
            Reset All
          </motion.button>
        </div>

        <FilterSection
          title="Categories"
          id="categories"
          icon={<CategoryIcon />}
          expanded={expandedSections.categories}
        >
          <div className="mt-3">
            <div className="bg-[#131c2b] rounded-xl p-1 border border-gray-700/30 relative overflow-hidden shadow-inner">
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400 pointer-events-none">
                <KeyboardArrowDownIcon fontSize="small" />
              </div>
              <select
                className="w-full p-3 bg-transparent text-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 rounded-lg transition-all duration-200"
                value={filters.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-[#1a2234] text-gray-200 py-2"
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </FilterSection>

        <FilterSection
          title="Price Range"
          id="price"
          icon={<PriceIcon />}
          expanded={expandedSections.price}
        >
          <div className="px-2 py-4">
            <div className="flex justify-between mb-2 text-sm text-gray-400">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
            <div className="relative mb-6">
              {/* Thanh nền */}
              <div className="h-1 w-full bg-gray-700 rounded-full"></div>

              {/* Thanh trượt đơn giản hơn - chỉ điều chỉnh giá tối đa */}
              <input
                type="range"
                min="0"
                max="2000"
                step="10"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handlePriceChange([
                    filters.priceRange[0],
                    parseInt(e.target.value),
                  ])
                }
                className="absolute top-0 w-full h-1 appearance-none bg-transparent pointer-events-auto z-10"
                style={{
                  WebkitAppearance: "none",
                }}
              />

              {/* Phần màu đã chọn */}
              <div
                className="absolute h-1 bg-indigo-500 rounded-full"
                style={{
                  width: `${(filters.priceRange[1] / 2000) * 100}%`,
                  left: 0,
                  top: "0",
                }}
              ></div>

              {/* Chỉ giữ lại một nút điều khiển ở cuối */}
              <div
                className="absolute w-5 h-5 bg-indigo-500 rounded-full shadow-md flex items-center justify-center z-20"
                style={{
                  left: `${(filters.priceRange[1] / 2000) * 100}%`,
                  top: "0",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </FilterSection>

        <FilterSection
          title="Condition"
          id="condition"
          icon={<ConditionIcon />}
          expanded={expandedSections.condition}
        >
          <div className="space-y-1 mt-2">
            {conditions.map((condition) => (
              <motion.div
                key={condition}
                whileHover={{ x: 3 }}
                className="flex items-center p-2 rounded-lg hover:bg-[#232d42] transition-colors"
              >
                <div
                  className="w-5 h-5 rounded flex items-center justify-center mr-3 text-indigo-400"
                  onClick={() => handleConditionChange(condition)}
                >
                  {filters.condition.includes(condition) ? (
                    <CheckCircleIcon fontSize="small" />
                  ) : (
                    <RadioButtonUncheckedIcon fontSize="small" />
                  )}
                </div>
                <label
                  onClick={() => handleConditionChange(condition)}
                  className="flex-1 text-gray-200 cursor-pointer"
                >
                  {condition}
                </label>
              </motion.div>
            ))}
          </div>
        </FilterSection>

        <FilterSection
          title="Brands"
          id="brands"
          icon={<BrandIcon />}
          expanded={expandedSections.brands}
        >
          <div className="mt-2">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search brands..."
                value={searchBrand}
                onChange={(e) => setSearchBrand(e.target.value)}
                className="w-full p-2 pl-9 bg-[#131c2b] border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-indigo-500"
              />
              <SearchIcon
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                fontSize="small"
              />
            </div>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
              {filteredBrands.map((brand) => (
                <motion.div
                  key={brand}
                  whileHover={{ x: 3 }}
                  className="flex items-center p-2 rounded-lg hover:bg-[#232d42] transition-colors"
                >
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center mr-3 text-indigo-400"
                    onClick={() => handleBrandChange(brand)}
                  >
                    {filters.brands.includes(brand) ? (
                      <CheckCircleIcon fontSize="small" />
                    ) : (
                      <RadioButtonUncheckedIcon fontSize="small" />
                    )}
                  </div>
                  <label
                    onClick={() => handleBrandChange(brand)}
                    className="flex-1 text-gray-200 cursor-pointer"
                  >
                    {brand}
                  </label>
                </motion.div>
              ))}
            </div>
          </div>
        </FilterSection>
      </div>
    </>
  );
};

// Custom icons
const CategoryIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="3"
      width="7"
      height="7"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      x="3"
      y="14"
      width="7"
      height="7"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      x="14"
      y="3"
      width="7"
      height="7"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      x="14"
      y="14"
      width="7"
      height="7"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const PriceIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2V22M17 5H9.5C8.12 5 7 6.12 7 7.5C7 8.88 8.12 10 9.5 10H14.5C15.88 10 17 11.12 17 12.5C17 13.88 15.88 15 14.5 15H7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ConditionIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BrandIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
      fill="currentColor"
    />
  </svg>
);

export default ProductFilters;
