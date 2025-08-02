import React from 'react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductList = ({ selectedCategory, selectedSubcategory, selectedSubsubcategory }) => {
  const { addToCart } = useCart();

  const filtered = products.filter(product => {
    return (
      (!selectedCategory || product.category === selectedCategory) &&
      (!selectedSubcategory || product.subcategory === selectedSubcategory) &&
      (!selectedSubsubcategory || product.subsubcategory === selectedSubsubcategory)
    );
  });

  return (
    <div className="container mt-4">
      <div className="row">
        {filtered.length === 0 ? (
          <div className="col-12">
            <p className="text-muted text-center">No products found for the selected category.</p>
          </div>
        ) : (
          filtered.map(product => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card h-100 shadow">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    <strong>Price:</strong> ${product.price}<br />
                    <small className="text-muted">{product.category} &gt; {product.subcategory} &gt; {product.subsubcategory}</small>
                  </p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
