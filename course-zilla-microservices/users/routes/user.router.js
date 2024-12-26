const express = require("express");
const router = express.Router();

const { register, signIn } = require("../controllers/auth/auth.controller");
const {
  profile,
  pushFollowers,
  updateDp,
} = require("../controllers/user/user.controller");

const isLoggedIn = require("../middlewares/isLoggedIn");

router.post("/register", register);
router.post("/sign_in", signIn);
router.post("/profile", isLoggedIn, profile);
router.post("/handle-followers", isLoggedIn, pushFollowers);
router.post("/update-dp", isLoggedIn, updateDp);

module.exports = router;
