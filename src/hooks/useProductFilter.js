import { useState, useEffect, useMemo } from "react";

const useProductFilter = (products) => {
  // State cho các bộ lọc
  const [filters, setFilters] = useState({
    category: "All Categories",
    priceRange: [0, 2000],
    condition: [],
    brands: [],
    searchQuery: "",
    sortBy: "newest",
  });

  // Hàm cập nhật bộ lọc
  const updateFilter = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Hàm xử lý thay đổi khoảng giá
  const handlePriceChange = (range) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: range,
    }));
  };

  // Hàm xử lý thay đổi điều kiện
  const handleConditionChange = (condition) => {
    setFilters((prev) => {
      const newConditions = prev.condition.includes(condition)
        ? prev.condition.filter((c) => c !== condition)
        : [...prev.condition, condition];

      return {
        ...prev,
        condition: newConditions,
      };
    });
  };

  // Hàm xử lý thay đổi thương hiệu
  const handleBrandChange = (brand) => {
    setFilters((prev) => {
      const newBrands = prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand];

      return {
        ...prev,
        brands: newBrands,
      };
    });
  };

  // Hàm xử lý thay đổi sắp xếp
  const handleSortChange = (sortOption) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: sortOption,
    }));
  };

  // Lọc và sắp xếp sản phẩm dựa trên các bộ lọc
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Lọc theo danh mục
        if (
          filters.category !== "All Categories" &&
          product.category !== filters.category
        ) {
          return false;
        }

        // Lọc theo khoảng giá
        if (
          product.price < filters.priceRange[0] ||
          product.price > filters.priceRange[1]
        ) {
          return false;
        }

        // Lọc theo điều kiện
        if (
          filters.condition.length > 0 &&
          !filters.condition.includes(product.condition)
        ) {
          return false;
        }

        // Lọc theo thương hiệu
        if (
          filters.brands.length > 0 &&
          !filters.brands.includes(product.brand)
        ) {
          return false;
        }

        // Lọc theo từ khóa tìm kiếm
        if (
          filters.searchQuery &&
          !product.name
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase())
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Sắp xếp sản phẩm
        switch (filters.sortBy) {
          case "newest":
            return b.id - a.id;
          case "price-low-high":
            return a.price - b.price;
          case "price-high-low":
            return b.price - a.price;
          case "rating":
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
  }, [products, filters]);

  return {
    filters,
    updateFilter,
    handlePriceChange,
    handleConditionChange,
    handleBrandChange,
    handleSortChange,
    filteredProducts,
  };
};

export default useProductFilter;
