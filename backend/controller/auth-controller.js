const User = require('./../model/userModel');
const Score = require ('./../model/Score') // Ensure the correct path to the User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');



exports.signup = async (req, res) => {
    const { name, email, number, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
      const userId = uuidv4();
  
      const user = new User({
        name,
        email,
        number,
        password: hashedPassword,
        userId
      });
  
      await user.save();
  
      let token;
      try {
        token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      } catch (tokenError) {
        console.error('Error generating JWT:', tokenError);
        return res.status(500).json({ message: 'Error generating authentication token.' });
      }
  
      return res.status(201).json({ token, userId: user._id });
    } catch (error) {
      console.error('Signup error:', error); // Log the error for debugging
      return res.status(500).json({ message: 'Server error. Could not sign up user.' });
    }
  };
  
// Login function
exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      console.log('Login attempt for email:', email);
  
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found:', email);
        return res.status(400).json({ message: 'Invalid email or password.' });
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        console.log('Invalid password for email:', email);
        return res.status(400).json({ message: 'Invalid email or password.' });
      }
  
      let token;
      try {
        token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      } catch (tokenError) {
        console.error('Error generating JWT:', tokenError);
        return res.status(500).json({ message: 'Error generating authentication token.' });
      }
  
      console.log('Login successful for user:', user._id);
      return res.json({ token, userId: user._id });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Server error. Could not log in user.' });
    }
  };
  

// Save score function
exports.saveScore = async (req, res) => {
  const { score } = req.body;
  const userId = req.user.id; // From the token

  if (!score) {
    return res.status(400).json({ message: 'Score is required.' });
  }

  try {
    const newScore = new Score({
      userId,
      score,
      date: new Date()
    });

    await newScore.save();
    res.status(201).json({ message: 'Score saved successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Could not save score.' });
  }
};
