import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['other', 'buy', 'fix', 'clean', 'exercise', 'research'],
    required: true
  },
  priority: {
    type: Number,
    enum: [0, 1, 2], // 0=normal, 1=high, 2=urgent
    default: 0
  }
}, {
  timestamps: true
})

export default mongoose.model('Todo', todoSchema)