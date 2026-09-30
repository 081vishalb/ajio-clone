import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const API = import.meta.env.VITE_API_URL;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url =
      category === 'all'
        ? `${API}/api/products`
        : `${API}/api/products?category=${category}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category]);

  return (
    <div className="container">
      <div className="filters">
        {['all', 'men', 'women', 'kids'].map((c) => (
          <button
            key={c}
            className={category === c ? 'active' : ''}
            onClick={() => setCategory(c)}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;