const router = require("express").Router();
const moment = require("moment");

const SHIPMENT = {
  regular: {
    price: 9.99,
    days: 7
  },
  express: {
    price: 39.99,
    days: 3
  }
};

function shipmentPrice(shipmentOption) {
  let estimated = moment()
    .add(shipmentOption.days, "d")
    .format("dddd MMMM Do");

  return {
    estimated,
    price: shipmentOption.price
  };
}

// @desc    Create Shipment
// @route   POST /api/v1/shipment
// @access  Private
router.post("/shipment", async (req, res) => {
  try {
    let shipment;
    if (req.body.shipment === "regular") {
      shipment = shipmentPrice(SHIPMENT.regular);
    } else {
      shipment = shipmentPrice(SHIPMENT.express);
    }

    res.json({
      success: true,
      shipment
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
