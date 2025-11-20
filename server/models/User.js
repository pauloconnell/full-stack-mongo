import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    roles: [{ type: String }],
  },
  { timestamps: true }
);

// index for faster name search
userSchema.index({ name: 1 });

export default mongoose.model('User', userSchema);
