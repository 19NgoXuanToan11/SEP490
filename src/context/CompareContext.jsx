import React, { createContext, useState, useContext } from "react";

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState([]);

  // Add or remove item from comparison list
  const toggleCompare = (item) => {
    if (compareItems.some((i) => i.id === item.id)) {
      setCompareItems(compareItems.filter((i) => i.id !== item.id));
    } else {
      if (compareItems.length >= 4) {
        // You might want to show a notification here
        console.warn("You can compare up to 4 items");
        return;
      }
      setCompareItems([...compareItems, item]);
    }
  };

  // Check if an item is in the comparison list
  const isInCompareList = (itemId) => {
    return compareItems.some((item) => item.id === itemId);
  };

  // Clear comparison list
  const clearCompareList = () => {
    setCompareItems([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        toggleCompare,
        isInCompareList,
        clearCompareList,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
