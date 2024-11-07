import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products'); // Ensure your server is running
        console.log('Fetched products:', response.data); // Log fetched products
        setItems(response.data);
        items.data=response.data;
        console.log(items)
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Calculate items in cart and total price
  const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => {
    const price = Number(item.price); // Ensure price is a number
    if (!isNaN(price)) {
      return total + price * item.quantity;
    } else {
      console.warn('Item price is invalid:', item); 
      console.log(item);// Log any invalid item prices
      return total; // Skip invalid items
    }
  }, 0);

  // Add an item to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item._id === product._id);
      if (existingProduct) {
        return prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    console.log("Product added to cart:", product); // Log added product
  };

  // Remove an item from the cart
  const removeFromCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item._id === product._id);
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          // Decrement the quantity
          return prevCart.map(item =>
            items._id === product._id ? { ...item, quantity: item.quantity - 1 } : item
          );
        }
        // If quantity is 1, remove the product from the cart
        return prevCart.filter(item => item._id !== product._id);
      }
      return prevCart; // Return the cart unchanged if the product is not found
    });
    console.log("Product removed from cart:", product); // Log removed product
  };

  return (
    <ItemContext.Provider value={{ items, addToCart, removeFromCart, itemsInCart, totalPrice }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItemContext must be used within an ItemProvider');
  }
  return context;
};

export default ItemContext;