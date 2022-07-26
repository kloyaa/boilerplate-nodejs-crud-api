const express = require("express");
const router = express.Router();

const image = require("../controllers/upload/upload-image");
const private = require("../middlewares/authentication");

router.post("/upload-image/single", (req, res) =>
  image.uploadSingleImage(req, res)
);

module.exports = router;
