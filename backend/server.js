const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./Routes/userRoutes');
const dataRoutes = require('./Routes/patientMedicalDataRoutes');
const { createInitialUser } = require('./Controllers/userController');

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
       createInitialUser()
     })
     .catch((err) => console.error('Could not connect to MongoDB:', err));


app.use('/api/users', userRoutes);
app.use('/api/data', dataRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});