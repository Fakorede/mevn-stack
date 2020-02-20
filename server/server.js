const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const User = require("./models/user");

const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const ownerRoutes = require("./routes/owner");

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
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
app.use(cors());

// Register routes
app.use("/api/v1/", productRoutes);
app.use("/api/v1/", categoryRoutes);
app.use("/api/v1/", ownerRoutes);

const port = process.env.PORT || 4005;

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening on PORT ${port}...`);
  }
});
