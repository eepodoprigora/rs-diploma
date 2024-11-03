const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
require("dotenv").config();

const port = 3001;

const app = express();

app.use(express.static(path.resolve("..", "frontend", "build")));

app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve("..", "frontend", "build", "index.html"));
});

mongoose.connect(process.env.MONGODB_URI).then(() =>
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  })
);
