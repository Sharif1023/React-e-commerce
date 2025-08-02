// src/pages/Home.jsx
import React, { useState } from 'react';
import CategorySelector from '../components/CategorySelector';
import ProductList from '../components/ProductList';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedSubsubcategory, setSelectedSubsubcategory] = useState('');

  return (
    <div className="container mt-5">
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
  );
};

export default Home;
