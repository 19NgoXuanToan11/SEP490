import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GridView as GridViewIcon,
  ViewList as ListViewIcon,
  FilterList as FilterIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Sort as SortIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const ProductSort = ({
  sortBy,
  onSortChange,
  totalProducts,
  currentView,
  onViewChange,
  onOpenMobileFilters,
  activeFilters = [],
  onRemoveFilter,
  onClearAllFilters,
}) => {
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "rating", label: "Rating" },
    { value: "popularity", label: "Popularity" },
  ];

  const handleSortChange = (value) => {
    onSortChange(value);
    setSortMenuOpen(false);
  };

  return (
    <div className="mb-6">
      {/* Main sort bar */}
      <div className="bg-[#1a2234] rounded-t-xl p-4 flex flex-wrap items-center gap-4">
        {/* View toggle */}
        <div className="flex items-center">
          <div className="bg-[#131c2b] rounded-lg p-1 flex">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewChange("grid")}
              className={`p-2 rounded-md transition-all duration-200 ${
                currentView === "grid"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
              aria-label="Grid view"
            >
              <GridViewIcon fontSize="small" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewChange("list")}
              className={`p-2 rounded-md transition-all duration-200 ${
                currentView === "list"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
              aria-label="List view"
            >
              <ListViewIcon fontSize="small" />
            </motion.button>
          </div>
        </div>

        {/* Products count */}
        <div className="text-sm text-gray-300">
          <span className="font-medium text-white">{totalProducts}</span>{" "}
          products found
        </div>

        {/* Mobile filter button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenMobileFilters}
          className="md:hidden flex items-center text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-lg shadow-sm transition-colors ml-auto"
        >
          <FilterIcon className="mr-1" fontSize="small" />
          <span className="text-sm font-medium">Filters</span>
        </motion.button>

        {/* Sort dropdown */}
        <div className="relative ml-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSortMenuOpen(!sortMenuOpen)}
            className="flex items-center gap-2 bg-[#131c2b] hover:bg-[#1d2a3d] text-white px-4 py-2 rounded-lg transition-colors"
          >
            <span className="text-sm">Sort:</span>
            <span className="text-sm font-medium text-indigo-400">
              {sortOptions.find((option) => option.value === sortBy)?.label}
            </span>
            <ArrowDownIcon
              className={`transition-transform duration-300 ${
                sortMenuOpen ? "rotate-180" : ""
              }`}
              fontSize="small"
            />
          </motion.button>

          {/* Dropdown menu */}
          <AnimatePresence>
            {sortMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setSortMenuOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-[#1e2a3b] shadow-lg z-20 py-1 border border-gray-700/50 overflow-hidden"
                >
                  {sortOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{
                        backgroundColor: "rgba(79, 70, 229, 0.1)",
                      }}
                      onClick={() => handleSortChange(option.value)}
                      className="flex items-center justify-between w-full px-4 py-2.5 text-left text-sm text-gray-200 hover:text-white"
                    >
                      <span>{option.label}</span>
                      {sortBy === option.value && (
                        <CheckIcon
                          fontSize="small"
                          className="text-indigo-500"
                        />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile sort options - only visible on small screens */}
      <div className="sm:hidden mt-3 bg-[#1a2234] rounded-xl p-3">
        <p className="text-xs text-gray-400 mb-2">Sort by:</p>
        <div className="grid grid-cols-2 gap-2">
          {sortOptions.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSortChange(option.value)}
              className={`px-3 py-2 rounded-md text-xs ${
                sortBy === option.value
                  ? "bg-indigo-600 text-white"
                  : "bg-[#131c2b] text-gray-300 hover:bg-[#1d2a3d]"
              }`}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSort;
