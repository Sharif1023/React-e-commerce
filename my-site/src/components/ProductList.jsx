import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Add this for navigation
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
                
                {/* ✅ Clicking the image opens product details */}
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.images ? product.images[0] : product.image} 
                    className="card-img-top" 
                    alt={product.name} 
                  />
                </Link>

                <div className="card-body d-flex flex-column">
                  {/* ✅ Clicking title also opens details */}
                  <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                    <h5 className="card-title">{product.name}</h5>
                  </Link>

                  <p className="card-text">
                    <strong>Price:</strong> ${product.price}<br />
                    <small className="text-muted">
                      {product.category} &gt; {product.subcategory} &gt; {product.subsubcategory}
                    </small>
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
