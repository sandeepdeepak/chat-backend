const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/chat-app", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

//To start mongodb in the terminal, run the below command
// C:\Users\vijaya\mongodb\bin\mongod.exe --dbpath=/Users/vijaya/mongodb-data
