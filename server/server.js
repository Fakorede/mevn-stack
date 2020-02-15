const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

mongoose.connect(
  "mongodb+srv://root:<password>@amazon-clone-eqa3f.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to the database...");
    }
  }
);

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Endpoints
app.get("/test", (req, res) => {
  res.send("Hello, Welcome to my App");
});

app.post("/test", (req, res) => {
  console.log(req.body.name);
});

const port = process.env.PORT || 4005;

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening on PORT ${port}...`);
  }
});
