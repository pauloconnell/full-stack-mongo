import express from 'express';
import User from '../models/User.js';

const router = express.Router();








// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find().lean();
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

export default router;
