const router = require("express").Router();
const Owner = require("../models/owner");

// @desc    Create new owner
// @route   POST /api/v1/owners
// @access  Public
router.post("/owners", async (req, res) => {
  try {
    const owner = new Owner();
    owner.name = req.body.name;
    owner.about = req.body.about;

    await owner.save();

    res.json({
      success: true,
      message: "New owner created successfully!"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// @desc    Get owner
// @route   GET /api/v1/owners
// @access  Public
router.get("/owners", async (req, res) => {
  try {
    let owners = await Owner.find();

    res.json({
      success: true,
      owners: owners
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
