// src/pages/CartPage.jsx
import React, { useState, useEffect } from 'react';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCartItems);
  }, []);

  const updateQuantity = (id, quantity) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountedPrice = totalPrice * 0.9;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={removeItem}
              onUpdateQuantity={updateQuantity}
            />
          ))}
          <div className="text-right mt-4">
            <p className="text-lg">Total: <span className="font-bold">${totalPrice.toFixed(2)}</span></p>
            <p className="text-lg">Discounted Total (10% off): <span className="font-bold text-green-600">${discountedPrice.toFixed(2)}</span></p>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
