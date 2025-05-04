import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/authroute.js';
import DeviceRoute from './routes/DeviceRoute.js';
dotenv.config();

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Smart Home API is running!');
  });
app.use('/api/auth', authRoute);
app.use('/api/device',DeviceRoute);

mongoose.connect(process.env.MONGO_URI, {
  
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
})
.catch(err => console.error('MongoDB connection error:', err));
