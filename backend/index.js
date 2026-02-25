import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import employeeRoutes from './routes/employeeRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.use(authRoutes);
app.use(employeeRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
  });

  app.listen(port, ()=> { 
    console.log(`api is running on http://localhost:${port}`)
  })