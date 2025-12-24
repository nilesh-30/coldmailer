import User from '../models/User.js';
import { generateToken } from '../services/jwtService.js';

// Register user
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password });

    // Generate token
    const token = generateToken(user._id);

    // Save token in cookies (with HttpOnly, Secure, and SameSite flags)
    res.cookie('token', token, {
      httpOnly: true, // Prevents client-side access to the cookie
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // CSRF protection
      maxAge: 3600000, // 1 hour expiration time
    });

    // Respond with the user and the token
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate token
    const token = generateToken(user._id);

    // Save token in cookies (with HttpOnly, Secure, and SameSite flags)
    res.cookie('token', token, {
      httpOnly: true, // Prevents client-side access to the cookie
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // CSRF protection
      maxAge: 3600000, // 1 hour expiration time
    });

    // Respond with the user
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in user
export const getMe = async (req, res) => {
  res.json({ user: req.user });
};
