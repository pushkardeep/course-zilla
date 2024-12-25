const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.SECRET);
    return { success: true, token };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Token generation error",
    };
  }
};

module.exports = generateToken;
