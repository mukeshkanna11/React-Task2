// src/pages/ProductPage.jsx
import React, { useState, useEffect } from 'react';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch products from Fake Store API
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));

    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCart(savedCart);
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let updatedCart;

    if (existingItem) {
      // If item is already in the cart, increase its quantity
      updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // If item is not in the cart, add it with a quantity of 1
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter(item => item.id !== product.id);
    setCart(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => {
          const isInCart = cart.some(item => item.id === product.id);
          
          return (
            <div 
              key={product.id} 
              className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300 flex flex-col h-80"
            >
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-32 object-cover mb-2" 
              />
              <h3 className="text-sm font-bold truncate">{product.title}</h3>
              <p className="text-gray-700 text-sm mb-2 truncate">{product.price.toFixed(2)}</p>
              <div className="mt-auto flex flex-col">
                <button
                  onClick={() => isInCart ? removeFromCart(product) : addToCart(product)}
                  className={`w-full px-4 py-2 ${isInCart ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600'} text-white font-semibold rounded-lg shadow-sm transition-all duration-300 transform hover:scale-105 mb-2`}
                >
                  {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                </button>
                <button
                  onClick={() => openModal(product)}
                  className="w-full px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-400 transition-colors duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto relative">
            <h2 className="text-lg font-bold">{selectedProduct.title}</h2>
            <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-48 object-cover my-4" />
            <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
            <p className="font-bold">Price: ${selectedProduct.price.toFixed(2)}</p>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              &times; {/* Close icon */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
