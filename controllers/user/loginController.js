require("dotenv").config();

const bcrypt = require("bcrypt");
const User = require("../../models/userModel");
const signToken = require("../../helpers/sign-token");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // VALIDATE IF EXISTED IN DATABASE
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Account doesn't exist" });
    }

    // COMPARE PASSWORD
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(400).json({ message: "Email/Password is invalid" });
    }

    return res.status(200).json({
      userId: user._id,
      role: user.role,
      email: user.email,
      createdAt: user.createdAt,
      token: signToken(user._id, process.env.ACCESS_TOKEN_SECRET, "2hr"),
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // VALIDATE IF EXISTED IN DATABASE
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).send({ message: "Email is currently used" });

    // ENCRYPT PASSWORD
    const hashValue = await bcrypt.hash(password, 12);

    return User({ email, role, passwordHash: hashValue })
      .save()
      .then((value) =>
        res.status(200).json({
          userId: value._id,
          role: value.role,
          email: value.email,
          createdAt: value.createdAt,
          token: signToken(value._id, process.env.ACCESS_TOKEN_SECRET, "2hr"),
        })
      )
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  login,
  register,
};
