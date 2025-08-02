import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './Cart.css'; // We'll create this CSS file for animations

const Cart = () => {
  const { cartItems, updateQty, removeFromCart } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="container py-5" style={{ maxWidth: '900px' }}>
      <h3 className="mb-4 text-center fw-bold" style={{ letterSpacing: '1px', color: '#2c3e50' }}>
        Your Shopping Cart
      </h3>

      {cartItems.length === 0 ? (
        <p className="text-center text-muted fs-5 mt-5">Your cart is currently empty.</p>
      ) : (
        <>
          <div className="table-responsive shadow rounded">
            <table className="table align-middle mb-4">
              <thead className="table-light">
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col" style={{ width: '120px' }}>Quantity</th>
                  <th scope="col" style={{ width: '120px' }}>Action</th>
                </tr>
              </thead>
              <TransitionGroup component="tbody">
                {cartItems.map((item) => (
                  <CSSTransition
                    key={item.id}
                    timeout={300}
                    classNames="fade"
                  >
                    <tr>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                            />
                          )}
                          <span className="fw-semibold">{item.title}</span>
                        </div>
                      </td>
                      <td className="text-primary fw-semibold">${item.price.toFixed(2)}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (val >= 1) updateQty(item.id, val);
                          }}
                          className="form-control form-control-sm"
                          style={{ maxWidth: '80px' }}
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="btn btn-outline-danger btn-sm"
                          aria-label={`Remove ${item.title} from cart`}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4 className="mb-0">
              Total: <span className="text-success">${total.toFixed(2)}</span>
            </h4>
            <Link to="/checkout" className="btn btn-success btn-lg px-4 shadow">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
