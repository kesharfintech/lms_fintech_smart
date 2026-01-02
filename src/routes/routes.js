// const express = require("express");
// const router = express.Router();

// router.post("/register", require("../controllers/authController").register);
// router.post("/login", require("../controllers/authController").login);
// router.post("/menu", require("../controllers/menuController").menu);

// module.exports = router;


const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const menuController = require("../controllers/menuController");
const auth = require("../middlewares/auth");

// public routes
router.post("/register", authController.register);
router.post("/login", authController.login);


// 🔐 protected route
router.post("/menu", auth, menuController.menu);

module.exports = router;
