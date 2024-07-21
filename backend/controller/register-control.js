import User from '../model/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const Register = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    if (!(fullname && username && email && password)) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      fullname,
      username,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ id: user._id, email, role: user.role }, process.env.SECRET_KEY, {
      expiresIn: '1d'
    });

    user.password = undefined;
    res.status(201).json({
      message: "You have successfully registered!",
      user,
      token
    });

  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
