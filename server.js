import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the Role-Based Access Control API');
});

// Connect to MongoDB
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB at ${process.env.MONGO_URI}`);
    // Start the server
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

start();