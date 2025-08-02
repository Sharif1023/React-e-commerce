// src/components/CategorySelector.jsx
import React from 'react';
import { categories } from '../data/categories';

const CategorySelector = ({
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  selectedSubsubcategory,
  setSelectedSubsubcategory
}) => {
  const subcategories = categories.find(c => c.name === selectedCategory)?.subcategories || [];
  const subsubcategories = subcategories.find(s => s.name === selectedSubcategory)?.subsubcategories || [];

  return (
    <div className="container my-4">
      <div className="row g-3">
        <div className="col-md-4">
          <label>Category</label>
          <select className="form-select" onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedSubcategory('');
            setSelectedSubsubcategory('');
          }} value={selectedCategory}>
            <option>Select Category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label>Subcategory</label>
          <select className="form-select" onChange={(e) => {
            setSelectedSubcategory(e.target.value);
            setSelectedSubsubcategory('');
          }} value={selectedSubcategory} disabled={!subcategories.length}>
            <option>Select Subcategory</option>
            {subcategories.map((sub, idx) => (
              <option key={idx} value={sub.name}>{sub.name}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label>Sub-subcategory</label>
          <select className="form-select" value={selectedSubsubcategory} onChange={(e) => setSelectedSubsubcategory(e.target.value)} disabled={!subsubcategories.length}>
            <option>Select Sub-subcategory</option>
            {subsubcategories.map((s, idx) => (
              <option key={idx}>{s}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
