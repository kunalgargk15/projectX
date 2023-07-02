const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authorisation = require("../controllers/authorization");

router.get("/hello", authorisation.auth, authController.getRes);

router.post("/signUp", authController.signUp);

router.post("/signIn", authController.signIn);

// router.get("./private-endpoint", auth, authController)

module.exports = router;
