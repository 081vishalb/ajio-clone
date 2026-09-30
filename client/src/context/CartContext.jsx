import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Start with whatever is saved in the browser (or an empty cart)
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Save the cart every time it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === product._id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i._id === product._id && i.size === size
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...prev, { ...product, size, qty: 1 }];
    });
  };

  const removeFromCart = (id, size) => {
    setCartItems((prev) => prev.filter((i) => !(i._id === id && i.size === size)));
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}