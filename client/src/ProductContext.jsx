import React, { createContext, useState, useContext } from 'react';

// Create a context
const ProductContext = createContext([]);

// Create a provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

// Create a custom hook to use the context
export const useProductContext = () => {
  return useContext(ProductContext);
};
