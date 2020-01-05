const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const messageRouter = require("./routers/message");

const app = express();
const port = process.env.PORT || 3000;

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(express.json());
app.use(userRouter);
app.use(messageRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
