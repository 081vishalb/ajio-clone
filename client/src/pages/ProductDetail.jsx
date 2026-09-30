import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const API = import.meta.env.VITE_API_URL;

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState('M');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data._id ? data : null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAdd = () => {
    addToCart(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <div className="container">Loading...</div>;
  if (!product) return <div className="container">Product not found</div>;

  return (
    <div className="container detail">
      <img src={product.image} alt={product.name} />
      <div className="detail-info">
        <h2>{product.brand}</h2>
        <h3>{product.name}</h3>
        <p className="price">₹{product.price}</p>
        <p>{product.description}</p>

        <div className="sizes">
          {['S', 'M', 'L', 'XL'].map((s) => (
            <button
              key={s}
              className={size === s ? 'active' : ''}
              onClick={() => setSize(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <button className="add-btn" onClick={handleAdd}>
          {added ? 'Added ✓' : 'ADD TO CART'}
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;