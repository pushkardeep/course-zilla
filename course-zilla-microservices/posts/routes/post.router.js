const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middlewares/isLoggedIn");

const {
  createPost,
  getCourses,
  getVideo,
  searchCourse
} = require("../controllers/posts.controller");

router.post("/create-post", isLoggedIn, createPost);
router.post("/get-courses", isLoggedIn, getCourses);
router.post("/get-video", isLoggedIn, getVideo);
router.post("/search", isLoggedIn, searchCourse);

module.exports = router;
