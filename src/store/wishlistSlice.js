import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage if available
const loadWishlistFromStorage = () => {
  try {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch (error) {
    console.error("Error loading wishlist from localStorage:", error);
    return [];
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: loadWishlistFromStorage(),
  },
  reducers: {
    toggleWishlistItem: (state, action) => {
      const product = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex >= 0) {
        // Remove item if it exists
        state.items.splice(existingIndex, 1);
      } else {
        // Add item if it doesn't exist
        state.items.push(product);
      }

      // Save to localStorage
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.setItem("wishlist", JSON.stringify([]));
    },
  },
});

export const { toggleWishlistItem, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
