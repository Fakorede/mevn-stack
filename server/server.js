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
const userRoutes = require("./routes/auth");
const reviewRoutes = require("./routes/review");
const addressRoutes = require("./routes/address");
const paymentRoutes = require("./routes/payment");
const orderRoutes = require("./routes/order");
const searchRoute = require("./routes/search");

dotenv.config({ path: "./config/config.env" });

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
app.use("/api/v1/", userRoutes);
app.use("/api/v1/", reviewRoutes);
app.use("/api/v1/", addressRoutes);
app.use("/api/v1/", paymentRoutes);
app.use("/api/v1/", orderRoutes);
app.use("/api/v1/", searchRoute);

const port = process.env.PORT || 4005;

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening on PORT ${port}...`);
  }
});
