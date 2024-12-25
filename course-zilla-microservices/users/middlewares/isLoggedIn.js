const jwt = require("jsonwebtoken");
const userModal = require("../models/user.model");

const isLoggedIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(400)
        .json({ success: false, message: "Authorization token is missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(400).json({ success: false, message: "Token is missing or malformed" });
    }

    decoded = jwt.verify(token, process.env.SECRET);
    const user = await userModal.findById(decoded.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || "Internal server error" });
  }
};

module.exports = isLoggedIn;
