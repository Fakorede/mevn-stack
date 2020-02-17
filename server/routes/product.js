const router = require("express").Router();
const Product = require("../models/product");

const upload = require("../middlewares/upload-photo");

const singleUpload = upload.single("photo");

router.post("/products", singleUpload, async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("Please upload a file");

    let product = new Product();
    product.title = req.body.title;
    product.description = req.body.description;
    product.price = req.body.price;
    product.stockQuantity = req.body.stockQuantity;
    product.photo = req.file.location;

    await product.save();

    res.json({
      success: true,
      message: "Saved Successfully!"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
