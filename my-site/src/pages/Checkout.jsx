import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  // Calculate totals
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

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

    alert(`✅ Order Placed Successfully via ${form.paymentMethod.toUpperCase()}!`);
    clearCart();
    navigate('/success');
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center">Secure Checkout</h2>
      <div className="row g-4">

        {/* Left Side: Billing Form */}
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-3 p-4">
            <h4 className="mb-3">Billing & Payment Details</h4>
            <form className="row g-3" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Full Name</label>
                <input type="text" name="name" className="form-control" required onChange={handleChange} />
              </div>
              {/* Address */}
              <div className="col-12">
                <label className="form-label fw-semibold">Shipping Address</label>
                <input type="text" name="address" className="form-control" required onChange={handleChange} />
              </div>

              {/* Payment Method */}
              <div className="col-12">
                <label className="form-label fw-semibold">Select Payment Method</label>
                <div className="d-flex gap-4 flex-wrap">
                  {['card', 'bkash', 'nagad', 'cod'].map((method) => (
                    <div className="form-check" key={method}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={form.paymentMethod === method}
                        onChange={handleChange}
                        id={method}
                      />
                      <label className="form-check-label text-capitalize" htmlFor={method}>
                        {method === 'cod' ? 'Cash on Delivery' : method}
                      </label>
                    </div>
                  ))}
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

              <div className="col-12 mt-3">
                <button type="submit" className="btn btn-success btn-lg w-100">
                  🛒 Place Order Securely
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="col-lg-4">
          <div className="card shadow-lg border-0 rounded-3 p-4">
            <h4 className="mb-3">Order Summary</h4>
            <p className="text-muted mb-2">{totalItems} item(s) in your cart</p>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item) => (
                  <div className="d-flex justify-content-between border-bottom py-2" key={item.id}>
                    <span>{item.title} × {item.qty}</span>
                    <strong>${(item.price * item.qty).toFixed(2)}</strong>
                  </div>
                ))}
                <div className="d-flex justify-content-between mt-3 fw-bold">
                  <span>Total</span>
                  <span className="text-success">${totalPrice.toFixed(2)}</span>
                </div>
              </>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
