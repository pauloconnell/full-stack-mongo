import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();

// middleware
app.use(express.json());
// Allow requests from your Vite dev server
app.use(cors({
  origin: 'http://localhost:5173',   // frontend dev server
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}))
app.use((err, req, res, next) => {  // global error handling Middleware
  console.error(err.stack)
  res.status(500).json({ error: err.message })
})

// mount routes
app.use('/api/users', usersRouter);



// Health check route (optional, handy for debugging)
app.get('/', (req, res) => {
  res.send('API is running...')
})

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 4000, () =>
    console.log(`Server running on port ${process.env.PORT || 4000}`)
  );
})
.catch(err => console.error('MongoDB connection error:', err));
