import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Admin } from "../models/userModel.js";

dotenv.config();

const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin in database
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials", success: false });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials", success: false });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export { adminlogin };