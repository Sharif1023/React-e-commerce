import React from 'react';
import ProductCard from '../components/ProductCard';
import products from '../products';

const Home = () => (
  <div className="container mt-5">
    <h2 className="mb-4">Welcome to E-Shop</h2>
    <div className="row">
      {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  </div>
);

export default Home;
