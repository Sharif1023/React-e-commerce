import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  // Calculate totals
  const totalItems = cartItems.reduce((sum, item) => sum + (item.qty || item.quantity || 0), 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.qty || item.quantity || 0), 0);

  const [form, setForm] = useState({
    name: '',
    address: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiry: '',
    cvv: '',
    bkashNumber: '',
    bkashTrx: '',
    nagadNumber: '',
    nagadTrx: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Payment-specific validation
    if (form.paymentMethod === 'bkash') {
      if (!/^\d{11}$/.test(form.bkashNumber)) return alert('Please enter a valid 11-digit bKash number (01XXXXXXXXX).');
      if (!form.bkashTrx || form.bkashTrx.trim().length < 4) return alert('Please enter a valid bKash transaction ID.');
    }

    if (form.paymentMethod === 'nagad') {
      if (!/^\d{11}$/.test(form.nagadNumber)) return alert('Please enter a valid 11-digit Nagad number (01XXXXXXXXX).');
      if (!form.nagadTrx || form.nagadTrx.trim().length < 4) return alert('Please enter a valid Nagad transaction ID.');
    }

    if (form.paymentMethod === 'card') {
      if (!/^\d{16}$/.test(form.cardNumber.replace(/\s+/g, '')) || !form.expiry || !form.cvv) {
        return alert('Please fill in valid card details.');
      }
    }

    // Prepare order data
    const orderData = {
      ...form,
      items: cartItems,
      total: totalPrice
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();
      if (res.ok) {
        alert(`✅ Order Placed Successfully! Order ID: ${data.orderId}`);
        clearCart();
        navigate('/success');
      } else {
        alert("❌ Order failed: " + data.message);
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("❌ Something went wrong!");
    }
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

              {/* Card Inputs */}
              {form.paymentMethod === 'card' && (
                <>
                  <div className="col-md-6">
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      className="form-control"
                      maxLength="19"
                      placeholder="XXXX XXXX XXXX XXXX"
                      required
                      value={form.cardNumber}
                      onChange={handleChange}
                    />
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

              {/* bKash Inputs */}
              {form.paymentMethod === 'bkash' && (
                <>
                  <div className="col-md-6">
                    <label className="form-label">bKash Number</label>
                    <input
                      type="text"
                      name="bkashNumber"
                      className="form-control"
                      maxLength="11"
                      placeholder="01XXXXXXXXX"
                      required
                      value={form.bkashNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">bKash Transaction ID</label>
                    <input
                      type="text"
                      name="bkashTrx"
                      className="form-control"
                      placeholder="e.g. TXN12345ABC"
                      required
                      value={form.bkashTrx}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {/* Nagad Inputs */}
              {form.paymentMethod === 'nagad' && (
                <>
                  <div className="col-md-6">
                    <label className="form-label">Nagad Number</label>
                    <input
                      type="text"
                      name="nagadNumber"
                      className="form-control"
                      maxLength="11"
                      placeholder="01XXXXXXXXX"
                      required
                      value={form.nagadNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Nagad Transaction ID</label>
                    <input
                      type="text"
                      name="nagadTrx"
                      className="form-control"
                      placeholder="e.g. NGD-987654"
                      required
                      value={form.nagadTrx}
                      onChange={handleChange}
                    />
                  </div>
                </>
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
                  <div className="d-flex align-items-center border-bottom py-3" key={item.id}>
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        className="me-3 rounded"
                      />
                    )}
                    <div className="flex-grow-1">
                      <strong>{item.title}</strong>
                      <div className="text-muted">Qty: {item.qty || item.quantity} × ${((item.price || 0)).toFixed(2)}</div>
                    </div>
                    <div>
                      <strong>${(((item.price || 0) * (item.qty || item.quantity || 0))).toFixed(2)}</strong>
                    </div>
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
