import express from 'express';
import User from '../models/User.js';
import Todo from '../models/Todo.js';

const router = express.Router();








// GET /api/users (exclude emails for security)
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find().select('-email').lean();
    res.json(users);
  } catch (err) {
    next(err);  // or res.status(500).json({ error: err.message }) for custom error response
  }
});

// POST /api/users
router.post('/', async (req, res, next) => {
  try {
    const { email, name, roles = [] } = req.body;
    const user = await User.create({ email, name, roles });
    res.status(201).json(user);
  } catch (err) {
    next(err);      // send error to global error handling middleware in index.js
  }
});

// DELETE /api/users/cleanup - for test cleanup
router.delete('/cleanup', async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
      // Delete user's todos first
      await Todo.deleteMany({ userId: user._id });
      
      // Delete user
      await User.deleteOne({ email });
    }
    
    res.json({ message: 'Cleanup completed' });
  } catch (err) {
    next(err);
  }
});

export default router;
