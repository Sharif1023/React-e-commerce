import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQty, removeFromCart } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="container py-5">
      <h3>Shopping Cart</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table">
            <thead><tr><th>Item</th><th>Price</th><th>Qty</th><th>Action</th></tr></thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>
                    <input type="number" min="1" value={item.qty}
                      onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                      style={{ width: '60px' }} />
                  </td>
                  <td><button onClick={() => removeFromCart(item.id)} className="btn btn-danger btn-sm">Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Total: ${total.toFixed(2)}</h4>
          <Link to="/checkout" className="btn btn-success">Proceed to Checkout</Link>
        </>
      )}
    </div>
  );
};

export default Cart;
