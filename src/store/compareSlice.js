import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage if available
const loadCompareFromStorage = () => {
  try {
    const savedCompare = localStorage.getItem("compare");
    return savedCompare ? JSON.parse(savedCompare) : [];
  } catch (error) {
    console.error("Error loading compare from localStorage:", error);
    return [];
  }
};

const compareSlice = createSlice({
  name: "compare",
  initialState: {
    items: loadCompareFromStorage(),
  },
  reducers: {
    toggleCompareItem: (state, action) => {
      const product = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex >= 0) {
        // Remove item if it exists
        state.items.splice(existingIndex, 1);
      } else {
        // Add item if it doesn't exist (with a limit of 4 items)
        if (state.items.length < 4) {
          state.items.push(product);
        }
      }

      // Save to localStorage
      localStorage.setItem("compare", JSON.stringify(state.items));
    },
    clearCompare: (state) => {
      state.items = [];
      localStorage.setItem("compare", JSON.stringify([]));
    },
  },
});

export const { toggleCompareItem, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;
