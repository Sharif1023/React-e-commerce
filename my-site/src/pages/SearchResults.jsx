import React from 'react';
import { useLocation } from 'react-router-dom';
import { products } from '../data/products'; // তুমি যেই ফাইলে products রেখেছো সেটার পাথ ঠিক করো

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery();
  const searchTerm = query.get('q')?.toLowerCase() || '';

  // সার্চ করার জন্য filter করা
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.subcategory.toLowerCase().includes(searchTerm) ||
    product.subsubcategory.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="container py-5" style={{ maxWidth: '900px' }}>
      <h2 className="mb-4">
        Search Results for: <em>{searchTerm || "All Products"}</em>
      </h2>

      {filteredProducts.length === 0 ? (
        <p>No products found matching your search.</p>
      ) : (
        <div className="row g-4">
          {filteredProducts.map(product => (
            <div className="col-md-4" key={product.id}>
              <div className="card h-100 shadow-sm">
                <img 
                  src={product.image} 
                  className="card-img-top" 
                  alt={product.name} 
                  style={{ objectFit: 'cover', height: '180px' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted mb-1">
                    Category: {product.category} &gt; {product.subcategory} &gt; {product.subsubcategory}
                  </p>
                  <p className="card-text fw-bold mt-auto">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;