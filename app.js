require("dotenv").config();

const port = process.env.PORT || 5000;
const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const app = express();

const { fileFilter, storage } = require("./services/file-upload");

try {
  mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => console.log("SERVER IS CONNECTED TO MONGODB"))
    .catch(() => console.log("SERVER CANNOT CONNECT TO MONGODB"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(multer({ storage, fileFilter }).single("img"));

  app.use("/api", require("./routes/api-upload-image"));
  app.use("/api", require("./routes/api-user"));

  app.listen(port, () => console.log("SERVER IS RUNNING"));
} catch (error) {
  console.log(error);
}
