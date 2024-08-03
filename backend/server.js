const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./Routes/userRoutes');
const adminRoutes = require('./Routes/adminRoutes');
const { createInitialAdmin } = require('./Controllers/adminController');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


//MongoDB Local environment
mongoose.connect(process.env.MONGO_URI_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
       console.log('MongoDB is Connected....')
       createInitialAdmin();
     })
     .catch((err) => console.error('Could not connect to MongoDB:', err));

// MongoDB Atlas - cloud database
// mongoose.connect(process.env.MONGO_URI_ATLAS, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('MongoDB connected')
//     createInitialAdmin();
//   })
//   .catch((err) => console.error('Could not connect to MongoDB:', err));

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});