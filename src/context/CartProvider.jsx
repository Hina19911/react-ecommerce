import { useEffect, useState } from 'react';
import { CartContext } from './CartContext';  // Context created elsewhere (createContext)
import PropTypes from 'prop-types';

export function CartProvider({ children }) {
  // 1️⃣ Initialize cart items state
  const [items, setItems] = useState(() => {
    // Load saved cart from localStorage (so cart persists across reloads)
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2️⃣ Save cart to localStorage every time "items" changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // 3️⃣ Function: add item to cart
  const addItem = (product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        // If product already in cart → increase its quantity
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 } // increment
            : item
        );
      }

      // If product not in cart → add with quantity = 1
      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  // 4️⃣ Function: remove item completely from cart
  const removeItem = (productId) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  // 5️⃣ Function: update quantity (can be used for + or - buttons)
  const updateQuantity = (productId, quantity) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, quantity) } // no negatives
            : item
        )
        .filter((item) => item.quantity > 0) // remove items that drop to 0
    );
  };

  // 6️⃣ Derived value: total number of items in cart
  let cartCount = 0;
  for (const item of items) {
    cartCount = cartCount + item.quantity;
  }

  // 7️⃣ Derived value: total price of all items
  let cartTotal = 0;
  for (const item of items) {
    const itemTotal = item.price * item.quantity;
    cartTotal = cartTotal + itemTotal;
  }

  // 8️⃣ Provide all state + functions + derived values to children
  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        cartCount,
        cartTotal,
      }}
    >
      {/* children = everything inside <CartProvider> in the tree */}
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node
};
