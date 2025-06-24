import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../../store/CartContext";
import type { CartContextType } from "../../store/CartContext";

const products = [
  { id: 1, name: "Product A", price: 10 },
  { id: 2, name: "Product B", price: 20 },
  { id: 3, name: "Product C", price: 30 },
];

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext) as CartContextType;
  const product = products.find((p) => p.id === Number(id));
  if (!product) return <div>Product not found</div>;
  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
      <div>
        <Link to="/products">Back to Products</Link> | <Link to="/cart">Go to Cart</Link>
      </div>
    </div>
  );
};

export default ProductDetails; 