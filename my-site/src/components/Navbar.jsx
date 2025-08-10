import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

import { FaShoppingBag, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { products } from '../data/products'; // তোমার প্রোডাক্ট ডাটা

const Navbar = () => {
  const { cartItems } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts([]);
      setShowDropdown(false);
      return;
    }

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setShowDropdown(filtered.length > 0);
  }, [searchTerm]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') return;
    navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm('');
    setShowDropdown(false);
  };

  const handleItemClick = (id) => {
    navigate(`/product/${id}`); // তোমার প্রোডাক্ট ডিটেইল পেজ যদি থাকে
    setSearchTerm('');
    setShowDropdown(false);
  };

  // ড্রপডাউন ছাড়া বাহির ক্লিক করলে dropdown বন্ধ হবে
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FaShoppingBag className="me-2" size={22} />
          <span className="fw-bold fs-4">E-Shop</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Left nav links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/projects"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                Projects
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Search form with live dropdown */}
          <div className="position-relative me-3" ref={inputRef} style={{ maxWidth: '300px', width: '100%' }}>
            <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
              <input
                className="form-control form-control-sm rounded-start"
                type="search"
                placeholder="Search products..."
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => { if(filteredProducts.length > 0) setShowDropdown(true); }}
                autoComplete="off"
              />
              <button
                className="btn btn-outline-light btn-sm rounded-end d-flex align-items-center justify-content-center"
                type="submit"
                aria-label="Submit search"
              >
                <FaSearch />
              </button>
            </form>

            {showDropdown && (
              <ul
                className="list-group position-absolute bg-white shadow-sm w-100 mt-1 rounded"
                style={{ maxHeight: '300px', overflowY: 'auto', zIndex: 1050 }}
              >
                {filteredProducts.map(product => (
                  <li
                    key={product.id}
                    className="list-group-item list-group-item-action d-flex align-items-center"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleItemClick(product.id)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px' }}
                    />
                    <div>
                      <div>{product.name}</div>
                      <small className="text-muted">${product.price.toFixed(2)}</small>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Cart Button with Badge */}
          <Link to="/cart" className="btn btn-outline-light position-relative">
            <FaShoppingCart className="me-2" size={20} />
            Cart
            {cartItems.length > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: '0.75rem' }}
              >
                {cartItems.length}
                <span className="visually-hidden">items in cart</span>
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
