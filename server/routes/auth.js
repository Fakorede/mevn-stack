const router = require("express").Router();
const User = require("../models/user");
const verifyToken = require("../middlewares/verify-token");

const jwt = require("jsonwebtoken");

// @desc    Signup route
// @route   POST /api/v1/auth/signup
// @access  Public
router.post("/auth/signup", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({
      success: false,
      message: "Please enter email or password"
    });
  } else {
    try {
      let newUser = new User();
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.password = req.body.password;

      await newUser.save();

      let token = jwt.sign(newUser.toJSON(), process.env.SECRET, {
        expiresIn: 604800 // 1 week
      });

      res.json({
        success: true,
        token,
        message: "New user successfully created!"
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }
});

// @desc    Login route
// @route   POST /api/v1/auth/login
// @access  Public
router.post("/auth/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "User does not exist"
      });
    } else {
      if (user.comparePassword(req.body.password)) {
        let token = jwt.sign(user.toJSON(), process.env.SECRET, {
          expiresIn: 604800 // a week
        });

        res.json({
          success: true,
          token
        });
      } else {
        res.status(403).json({
          success: false,
          message: "Authentication failed, Incorrect username or password"
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// @desc    Profile route
// @route   POST /api/v1/auth/user
// @access  Private
router.get("/auth/user", verifyToken, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.decoded._id }).populate("address");
    if (user) {
      res.json({
        success: true,
        user
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// @desc    Update profile route
// @route   PUT /api/v1/auth/user
// @access  Private
router.put("/auth/user", verifyToken, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.decoded._id });

    if (user) {
      if (req.body.name) user.name = req.body.name;
      if (req.body.email) user.email = req.body.email;
      if (req.body.password) user.password = req.body.password;
    }

    await user.save();

    res.json({
      success: true,
      message: "Successfully updated!"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
