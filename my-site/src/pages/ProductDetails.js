// src/pages/ProductDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart } = useCart();

  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Product Images */}
        <div className="col-md-6">
          <div id="carouselExample" className="carousel slide">
           <div className="carousel-inner">
  {(product.images || [product.image]).map((img, index) => (
    <div
      key={index}
      className={`carousel-item ${index === 0 ? 'active' : ''}`}
    >
      <img src={img} className="d-block w-100" alt={product.name} />
    </div>
  ))}
</div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <h4>${product.price}</h4>
          <p>{product.description}</p>
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
