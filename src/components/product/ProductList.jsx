import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Pagination,
  CircularProgress,
} from "@mui/material";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";

const ProductList = ({ title, category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    category: category || "",
    priceRange: [0, 5000],
    condition: [],
    brand: [],
    sortBy: "newest",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Here you would fetch products from your API
        // For now, we'll use mock data
        const mockProducts = Array(12)
          .fill()
          .map((_, index) => ({
            id: index + 1,
            name: `${filters.category || "Electronic"} Device ${index + 1}`,
            description:
              "This is a high-quality electronic device with great features and excellent condition.",
            price: Math.floor(Math.random() * 1000) + 100,
            originalPrice: Math.floor(Math.random() * 1500) + 200,
            image: `https://via.placeholder.com/300x200?text=Product+${
              index + 1
            }`,
            condition: ["New", "Like New", "Good", "Fair", "Poor"][
              Math.floor(Math.random() * 5)
            ],
            rating: (Math.random() * 5).toFixed(1),
            reviewCount: Math.floor(Math.random() * 100),
            exchangeAvailable: Math.random() > 0.5,
            category:
              filters.category ||
              ["Laptop", "Smartphone", "Tablet", "Camera", "Headphones"][
                Math.floor(Math.random() * 5)
              ],
            brand: ["Apple", "Samsung", "Sony", "Dell", "HP", "Lenovo"][
              Math.floor(Math.random() * 6)
            ],
          }));

        setProducts(mockProducts);
        setTotalPages(5); // Mock total pages
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, page, category]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
    setPage(1);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {title || "All Products"}
      </Typography>

      <Box sx={{ display: "flex", gap: 4, mt: 3 }}>
        <Box sx={{ width: 280 }}>
          <ProductFilter
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress />
            </Box>
          ) : products.length === 0 ? (
            <Typography variant="h6" sx={{ textAlign: "center", py: 8 }}>
              No products found matching your criteria.
            </Typography>
          ) : (
            <>
              <Grid container spacing={3}>
                {products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductList;
