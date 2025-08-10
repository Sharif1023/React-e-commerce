// src/pages/Home.jsx
import React, { useState } from 'react';
import CategorySelector from '../components/CategorySelector';
import ProductList from '../components/ProductList';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedSubsubcategory, setSelectedSubsubcategory] = useState('');

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container mt-5 flex-grow-1">
        <h1 className="text-center mb-4">Welcome to Our E-Commerce Store</h1>
        <CategorySelector
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSubcategory={selectedSubcategory}
          setSelectedSubcategory={setSelectedSubcategory}
          selectedSubsubcategory={selectedSubsubcategory}
          setSelectedSubsubcategory={setSelectedSubsubcategory}
        />
        <ProductList
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          selectedSubsubcategory={selectedSubsubcategory}
        />
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3 mt-auto">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Our E-Commerce Store. All rights reserved.
        </p>
        <small>
          Designed with ❤️ by Sharnduuuuu
        </small>
      </footer>
    </div>
  );
};

export default Home;
