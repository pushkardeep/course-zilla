const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middlewares/isLoggedIn");

const {
  createPost,
  getCourses,
  getVideo,
} = require("../controllers/posts.controller");

router.post("/create-post", isLoggedIn, createPost);
router.post("/get-courses", isLoggedIn, getCourses);
router.post("/get-video", isLoggedIn, getVideo);

module.exports = router;
