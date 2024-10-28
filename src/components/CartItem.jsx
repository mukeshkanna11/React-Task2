// src/components/CartItem.jsx
import React from 'react';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1; // Default to 1 if invalid input
    onUpdateQuantity(item.id, newQuantity);
  };

  const incrementQuantity = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div className="flex items-center">
        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mr-4" />
        <div>
          <p className="font-semibold">{item.title}</p>
          <p>${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={decrementQuantity}
          className="px-2 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
        >
          -
        </button>
        <input
          type="number"
          value={item.quantity}
          onChange={handleQuantityChange}
          min="1"
          className="w-12 text-center border mx-2 rounded"
        />
        <button
          onClick={incrementQuantity}
          className="px-2 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
        >
          +
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
