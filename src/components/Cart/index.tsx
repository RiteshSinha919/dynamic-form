import React, { useContext } from "react";
import { CartContext } from "../../store/CartContext";
import type { CartContextType } from "../../store/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(
    CartContext
  ) as CartContextType;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <div>Cart is empty</div>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} x
              <input
                type="number"
                value={item.quantity}
                min={1}
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value))
                }
                style={{ width: 40 }}
              />
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div>Total: ${total}</div>
      <Link to="/products">Back to Products</Link>
    </div>
  );
};

export default Cart;
