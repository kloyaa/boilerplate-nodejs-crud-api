const cloudinary = require("../../services/cloudinary");

const uploadSingleImage = async (req, res) => {
  try {
    const filePath = req.file.path;
    const options = {
      folder: process.env.CLOUDINARY_FOLDER + `/nodejs-crud-api`,
      unique_filename: true,
    };
    const uploadedImg = await cloudinary.uploader.upload(filePath, options);

    return res.status(200).json(uploadedImg);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  uploadSingleImage,
};
