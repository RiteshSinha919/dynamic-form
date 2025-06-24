import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../store/CartContext";
import type { CartContextType } from "../../store/CartContext";

const products = [
  { id: 1, name: "Product A", price: 10 },
  { id: 2, name: "Product B", price: 20 },
  { id: 3, name: "Product C", price: 30 },
];

const ProductList = () => {
  const { addToCart } = useContext(CartContext) as CartContextType;
  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link> - ${product.price}
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      <Link to="/cart">Go to Cart</Link>
    </div>
  );
};

export default ProductList; 