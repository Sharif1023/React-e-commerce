import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="container text-center py-5">
      <h2>🎉 Thank You!</h2>
      <p>Your order was placed successfully.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
};

export default Success;
