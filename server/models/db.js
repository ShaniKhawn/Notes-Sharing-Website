const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/Project", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 })
 .then(() => console.log("db is connected"))
 .catch((err) => console.log(err));