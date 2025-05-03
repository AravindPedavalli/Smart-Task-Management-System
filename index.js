const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const app = express();

mongoose.connect('mongodb://localhost:27017/stms', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Received ${req.method} request at ${req.url}`);
  next();
});

app.use('/api', authRoutes);
app.use('/api', taskRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));