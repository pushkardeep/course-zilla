const userModel = require("../../models/user.model");
const { createUser } = require("../../services/user/user.service");
const generateToken = require("../../utils/generate-token");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) {
      return res.status(400).json({
        success: false,
        message: "Encryption error",
      });
    }

    const { user, success, message } = await createUser(
      username,
      email,
      hashedPassword
    );

    if (!success) {
      return res.status(400).json({ success: false, message });
    }

    const result = generateToken({ id: user._id });
    if (!result.success) {
      return res.status(400).json({ success: false, message: result.message });
    }

    return res.status(200).json({ success: true, token: result.token });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email or password is incorrect.",
      });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Email or password is incorrect.",
        });
      }
      if (isMatch) {
        const result = generateToken({ id: user._id });
        if (!result.success) {
          return res
            .status(400)
            .json({ success: false, message: result.message });
        }

        return res.status(200).json({ success: true, token: result.token });
      } else {
        return res.status(400).json({
          success: false,
          message: "Email or password is incorrect.",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

module.exports = { register, signIn };
