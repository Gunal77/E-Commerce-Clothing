const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const { connectToDatabase } = require('./config/db');

require('dotenv').config();

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors({ 
  origin: process.env.CLIENT_URL || ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true 
}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

const start = async () => {
  const port = process.env.PORT || 5000;
  await connectToDatabase();
  app.listen(port, () => console.log(`Server running on port ${port}`));
};

start();


