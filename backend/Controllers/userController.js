const User = require("../Models/User");
const jwt = require("jsonwebtoken");

//Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const createInitialUser = async () => {
  try {
    const existingUser = await User.findOne({
      email: "tharindudasun1997@gmail.com",
    });

    if (!existingUser) {
      const password = "dasun";

      const user = new User({
        email: "tharindudasun1997@gmail.com",
        password: password,
      });
      await user.save();
      console.log("Initial user created successfully");
    } else {
      console.log(" User already exists");
    }
  } catch (error) {
    console.error("Error creating initial admin user:", error);
  }
};

// Function to register a new user
const signUpUser = async (req, res) => {
  console.log("Request body:", req.body);
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await User.create({
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to authenticate a user
const authUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to change password
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user._id);

    if (user && (await user.matchPassword(currentPassword))) {
      user.password = newPassword;
      await user.save();
      res.status(200).json({ message: "Password updated successfully" });
    } else {
      res.status(400).json({ message: "Current password is incorrect" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to handle forgot password
const forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createInitialUser,
  signUpUser,
  authUser,
  changePassword,
  forgotPassword,
};
