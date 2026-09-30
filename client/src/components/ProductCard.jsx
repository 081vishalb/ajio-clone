import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="card">
      <img src={product.image} alt={product.name} />
      <div className="card-info">
        <h4>{product.brand}</h4>
        <p>{product.name}</p>
        <strong>₹{product.price}</strong>
      </div>
    </Link>
  );
}

export default ProductCard;