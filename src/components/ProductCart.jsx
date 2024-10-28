// src/components/ProductCard.jsx
import React, { useState } from 'react';

const ProductCard = ({ product }) => {
  const [inCart, setInCart] = useState(false);

  const handleAddToCart = () => {
    // Add to cart logic
    setInCart(true);
  };

  const handleRemoveFromCart = () => {
    // Remove from cart logic
    setInCart(false);
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <img src={product.image} alt={product.title} className="w-full h-40 object-contain" />
      <h3 className="text-lg font-semibold">{product.title}</h3>
      <p className="text-gray-700">${product.price}</p>
      {inCart ? (
        <button onClick={handleRemoveFromCart} className="bg-red-500 text-white px-4 py-2 rounded mt-2">
          Remove from Cart
        </button>
      ) : (
        <button onClick={handleAddToCart} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
