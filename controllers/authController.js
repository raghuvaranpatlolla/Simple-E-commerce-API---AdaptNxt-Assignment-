const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "supersecretkey";

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(400).json({ message: "Registration failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: "1d" });
  res.json({ token, role: user.role });
};