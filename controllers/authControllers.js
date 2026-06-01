import model from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, password, role } = req.body;
  
  try {
    // Check if user already exists
    const existinguser = await model.findOne({ username });
    if (existinguser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new model({
      username,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: `User registered successfully ${newUser.username}` });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};



export const Login = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // check if user exists
    const user = await model.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    //verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    // generate JWT token
    const token = jwt.sign({
      userId: user._id,
      role: user.role,
    },
      process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
}