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

// @desc    Update address
// @route   PUT /api/v1/addresses/:id
// @access  Private
router.put("/addresses/:id", verifyToken, async (req, res) => {
  try {
    let address = await Address.findOne({
      user: req.decoded._id,
      _id: req.params.id
    });

    if (address) {
      if (req.body.country) address.country = req.body.country;
      if (req.body.fullName) address.fullName = req.body.fullName;
      if (req.body.streetAddress)
        address.streetAddress = req.body.streetAddress;
      if (req.body.city) address.city = req.body.city;
      if (req.body.state) address.state = req.body.state;
      if (req.body.zipCode) address.zipCode = req.body.zipCode;
      if (req.body.phoneNumber) address.phoneNumber = req.body.zipCode;
      if (req.body.deliverInstructions)
        address.deliverInstructions = req.body.deliverInstructions;
      if (req.body.securityCode) address.securityCode = req.body.securityCode;

      await address.save();
    }

    res.json({
      success: true,
      message: "Successfully updated address"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// @desc    Delete address
// @route   DELETE /api/v1/addresses/:id
// @access  Private
router.delete("/addresses/:id", verifyToken, async (req, res) => {
  try {
    let deletedAddress = await Address.remove({
      user: req.decoded._id,
      _id: req.params.id
    });

    if (deletedAddress) {
      res.json({
        success: true,
        message: "Successfully deleted address"
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// @desc    Set default address
// @route   PUT /api/v1/addresses/set/default
// @access  Private
router.put("/addresses/set/default", verifyToken, async (req, res) => {
  try {
    let defaultAddress = await User.findOneAndUpdate(
      { _id: req.decoded._id },
      { $set: { address: req.body.id } }
    );

    if (defaultAddress) {
      res.json({
        success: true,
        message: "Successfully set address as default"
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
