const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Event_planner',{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

