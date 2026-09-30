require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Product model: what a product looks like in the database
const Product = mongoose.model('Product', {
  name: String,
  brand: String,
  price: Number,
  category: String,
  image: String,
  description: String,
});

// 2. Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// 3. Get all products (optional filter: /api/products?category=men)
app.get('/api/products', async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. Get one product by its id
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 5. Seed route: adds sample products (we will delete this later)


// 6. Connect to database, then start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    // app.listen(5000, () => console.log('Server running on port 5000'));
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log('Server running on port ' + PORT));
  })
  .catch((err) => console.log('Connection error:', err.message));