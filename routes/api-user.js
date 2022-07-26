const express = require("express");
const router = express.Router();

const user = require("../controllers/user/loginController");

router.post("/user/login", (req, res) => user.login(req, res));
router.post("/user/registration", (req, res) => user.register(req, res));

module.exports = router;
