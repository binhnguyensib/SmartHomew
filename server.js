import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuthRoute from './routes/authroute.js'
import DeviceRoute from './routes/DeviceRoute.js';
import connectDB from './config/db.js';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
  }));
app.get('/', (req, res) => {
    res.send('Smart Home API is running!');
  });
app.use('/api/auth', AuthRoute);
app.use('/api/device',DeviceRoute);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch(err => console.error('Server startup failed:', err));

