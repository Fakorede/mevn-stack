const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const User = require("./models/user");

const productRoutes = require("./routes/product");

dotenv.config();

const app = express();

mongoose.connect(
  process.env.DATABASE_CONN,
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

app.use("/api/v1/", productRoutes);

const port = process.env.PORT || 4005;

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening on PORT ${port}...`);
  }
});
