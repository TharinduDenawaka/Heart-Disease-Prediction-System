const Admin = require('../Models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};


const createInitialAdmin = async () => {
    try {
      const existingAdmin = await Admin.findOne({ email: 'admin@gmail.com' });
  
      if (!existingAdmin) {
        const password = 'admin'; 
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const admin = new Admin({
          email: 'admin@gmail.com',
          password: hashedPassword,
        });
  
        await admin.save();
        console.log('Initial admin user created successfully');
      } else {
        console.log('Admin user already exists');
      }
    } catch (error) {
      console.error('Error creating initial admin user:', error);
    }
  };


const registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    return res.status(400).json({ message: 'Admin already exists' });
  }

  const admin = await Admin.create({
    email,
    password,
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid admin data' });
  }
};

const authAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

module.exports = { createInitialAdmin, registerAdmin, authAdmin };