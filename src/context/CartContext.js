import { createContext, useContext } from 'react';

export const CartContext = createContext();

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}