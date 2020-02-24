const router = require("express").Router();
const Product = require("../models/product");

const upload = require("../middlewares/upload-photo");

const singleUpload = upload.single("photo");

// @desc    Create new product
// @route   POST /api/v1/product
// @access  Public
router.post("/products", singleUpload, async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("Please upload a file");

    let product = new Product();
    product.category = req.body.categoryID;
    product.owner = req.body.ownerID;
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

// @desc    Get products
// @route   GET /api/v1/products
// @access  Public
router.get("/products", async (req, res) => {
  try {
    let products = await Product.find()
      .populate("owner category")
      .exec();

    res.json({
      success: true,
      products: products
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
router.get("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id })
      .populate("category owner")
      .exec();

    if (!product)
      return res.status(404).send("Product with given ID does not exist.");

    res.json({
      success: true,
      product: product
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// @desc    Update single product
// @route   PUT /api/v1/products/:id
// @access  Public
router.put("/products/:id", upload.single("photo"), async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          stockQuantity: req.body.stockQuantity,
          category: req.body.categoryID,
          owner: req.body.ownerID,
          photo: req.file.location
        }
      },
      { useFindAndModify: false }
    );

    res.json({
      success: true,
      updatedProduct: product
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Public
router.delete("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOneAndDelete({ _id: req.params.id });

    res.json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
