// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/mugi.png'; // Adjust the path based on where your logo is located

const Navbar = ({ cartCount }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800  text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Fashion Store Logo" className="h-24 " /> {/* Adjust height as needed */}
          <span className="text-xl font-bold">Fashion Store</span>
        </Link>
        <div className="relative">
          <Link to="/cart" className="text-lg flex items-center">
            <button className="mr-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 px-3 rounded">Cart</button>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
