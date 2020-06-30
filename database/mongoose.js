const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Eventplanner',{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

