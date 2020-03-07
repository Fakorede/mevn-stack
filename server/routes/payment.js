const router = require("express").Router();
const moment = require("moment");
const stripe = require("stripe");

const verifyToken = require("../middlewares/verify-token");
const Order = require("../models/order");

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

router.post("/payment", verifyToken, (req, res) => {
  let totalPrice = Math.round(req.body.totalPrice * 100);

  // create new customer and charge for that customer
  stripe.customers
    .create({
      email: req.decoded.email
    })
    .then(customer => {
      return stripe.customers.createSource(customer.id, {
        source: "tok_visa"
      });
    })
    .then(source => {
      return stripe.charges.create({
        amount: totalPrice,
        currency: "usd",
        customer: source.customer
      });
    })
    .then(async charge => {
      // store order information
      let order = new Order();
      let cart = req.body.cart;

      cart.map(product => {
        order.products.push({
          productID: product._id,
          quantity: parseInt(product.quantity),
          price: product.price
        });
      });

      order.owner = req.decoded._id;
      order.estimatedDelivery = req.body.estimatedDelivery;
      await order.save();
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
});

module.exports = router;
