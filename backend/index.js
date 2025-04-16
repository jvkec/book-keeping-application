const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors({ origin: '*' })); // Allow all origins for testing
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB (with error handling to allow server to start regardless)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Server will continue without database connection');
  });

// Basic route
app.get('/', (req, res) => {
  res.send('QuickBooks Clone API is running');
});

// Import routes
const clientRoutes = require('./routes/clients');
const projectRoutes = require('./routes/projects');

// Create simple placeholder routes for now
const router = express.Router();
router.get('/', (req, res) => {
  res.json({ message: "This route is not implemented yet" });
});

// Use routes
app.use('/api/clients', clientRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/expenses', router);
app.use('/api/invoices', router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

// 404 handler for undefined routes
app.use((req, res) => {
  console.log(`404 Not Found: ${req.method} ${req.url}`);
  res.status(404).json({ message: 'Route not found' });
});

// Define port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});