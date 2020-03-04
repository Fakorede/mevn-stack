const router = require("express").Router();
const Address = require("../models/address");
const verifyToken = require("../middlewares/verify-token");

const axios = require("axios");

// @desc    Add new address
// @route   POST /api/v1/addresses
// @access  Private
router.post("/addresses", verifyToken, async (req, res) => {
  try {
    let address = new Address();
    address.user = req.decoded._id;
    address.country = req.body.country;
    address.fullName = req.body.fullName;
    address.streetAddress = req.body.streetAddress;
    address.city = req.body.city;
    address.state = req.body.state;
    address.zipCode = req.body.zipCode;
    address.phoneNumber = req.body.zipCode;
    address.deliverInstructions = req.body.deliverInstructions;
    address.securityCode = req.body.securityCode;

    await address.save();

    res.json({
      success: true,
      message: "Successfully added a new address"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// @desc    Get address
// @route   GET /api/v1/addresses
// @access  Private
router.get("/addresses", verifyToken, async (req, res) => {
  try {
    let addresses = await Address.find({ user: req.decoded._id });

    res.json({
      success: true,
      addresses
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// @desc    Get countries
// @route   GET /api/v1/countries
// @access  Private
router.get("/countries", async (req, res) => {
  try {
    let response = await axios.get("https://restcountries.eu/rest/v2/all");

    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
