import User from '../models/User.js'

// Login with name and email verification
const loginUser = async (req, res) => {
  try {
    const { name, email } = req.body
    
    const user = await User.findOne({ name, email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid name or email' })
    }
    
    // Return user without email for security
    const { email: userEmail, ...userWithoutEmail } = user.toObject()
    res.json(userWithoutEmail)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export { loginUser }