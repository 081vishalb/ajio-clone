import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <h2>Your cart is empty</h2>
        <Link to="/" className="continue">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Shopping Cart</h2>

      {cartItems.map((item) => (
        <div className="cart-item" key={item._id + item.size}>
          <img src={item.image} alt={item.name} />
          <div className="cart-item-info">
            <h4>{item.brand}</h4>
            <p>{item.name}</p>
            <p>Size: {item.size}</p>
            <p>Qty: {item.qty}</p>
            <strong>₹{item.price * item.qty}</strong>
          </div>
          <button
            className="remove-btn"
            onClick={() => removeFromCart(item._id, item.size)}
          >
            Remove
          </button>
        </div>
      ))}

      <div className="cart-total">
        <h3>Total: ₹{total}</h3>
        <button className="add-btn">CHECKOUT (coming soon)</button>
      </div>
    </div>
  );
}

export default Cart;