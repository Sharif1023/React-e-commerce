import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    address: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiry: '',
    cvv: '',
    bkashNumber: '',
    nagadNumber: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.paymentMethod === 'bkash' && form.bkashNumber.length !== 11) {
      return alert('Please enter a valid Bkash number');
    }

    if (form.paymentMethod === 'nagad' && form.nagadNumber.length !== 11) {
      return alert('Please enter a valid Nagad number');
    }

    if (form.paymentMethod === 'card' && (form.cardNumber.length !== 16 || !form.expiry || !form.cvv)) {
      return alert('Please fill in all card details');
    }

    alert(`Order Placed Successfully via ${form.paymentMethod.toUpperCase()}!`);
    clearCart();
    navigate('/success');
  };

  return (
    <div className="container py-5">
      <h2>Checkout</h2>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" required onChange={handleChange} />
        </div>
        <div className="col-12">
          <label className="form-label">Address</label>
          <input type="text" name="address" className="form-control" required onChange={handleChange} />
        </div>

        <div className="col-12">
          <label className="form-label">Select Payment Method</label>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="paymentMethod" value="card" checked={form.paymentMethod === 'card'} onChange={handleChange} />
            <label className="form-check-label">Credit / Debit Card</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="paymentMethod" value="bkash" checked={form.paymentMethod === 'bkash'} onChange={handleChange} />
            <label className="form-check-label">Bkash</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="paymentMethod" value="nagad" checked={form.paymentMethod === 'nagad'} onChange={handleChange} />
            <label className="form-check-label">Nagad</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="paymentMethod" value="cod" checked={form.paymentMethod === 'cod'} onChange={handleChange} />
            <label className="form-check-label">Cash on Delivery</label>
          </div>
        </div>

        {/* Conditional Inputs */}
        {form.paymentMethod === 'card' && (
          <>
            <div className="col-md-6">
              <label className="form-label">Card Number</label>
              <input type="text" name="cardNumber" className="form-control" maxLength="16" required value={form.cardNumber} onChange={handleChange} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Expiry</label>
              <input type="text" name="expiry" className="form-control" placeholder="MM/YY" required value={form.expiry} onChange={handleChange} />
            </div>
            <div className="col-md-3">
              <label className="form-label">CVV</label>
              <input type="text" name="cvv" className="form-control" maxLength="4" required value={form.cvv} onChange={handleChange} />
            </div>
          </>
        )}

        {form.paymentMethod === 'bkash' && (
          <div className="col-md-6">
            <label className="form-label">Bkash Number</label>
            <input type="text" name="bkashNumber" className="form-control" maxLength="11" required value={form.bkashNumber} onChange={handleChange} />
          </div>
        )}

        {form.paymentMethod === 'nagad' && (
          <div className="col-md-6">
            <label className="form-label">Nagad Number</label>
            <input type="text" name="nagadNumber" className="form-control" maxLength="11" required value={form.nagadNumber} onChange={handleChange} />
          </div>
        )}

        <div className="col-12">
          <button type="submit" className="btn btn-success">Place Order</button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
