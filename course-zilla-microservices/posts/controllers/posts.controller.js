const postModel = require("../models/post.model");
const userModal = require("../models/user.modal");
const frameModel = require("../models/frame.model");
const { create, makeFrame } = require("../services/post.service");
const updatePostsInUser = require("../services/user.service");

const createPost = async (req, res) => {
  try {
    const { title, description, videoUrl, coverUrl } = req.body;

    if (!title || !description || !videoUrl || !coverUrl) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const { _id } = req.user;

    // creating post
    const { success, message, post } = await create({
      title,
      description,
      videoUrl,
      coverUrl,
      user: _id,
    });

    if (!success) {
      return res.status(400).json({
        success: false,
        message: message || "Post creation error",
      });
    }

    const response = await updatePostsInUser(_id, post._id);
    if (!response.success) {
      return res.status(400).json({
        success: false,
        message: response.message || "Something went wrong",
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Course created Successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Post creation error",
    });
  }
};

const getCourses = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Fetch courses
    const courses = await postModel.find();

    if (!courses) {
      return res.status(400).json({
        success: false,
        message: "No courses found",
      });
    }

    const enrichedCourses = await Promise.all(
      courses.map(async (course) => {
        const creator = await userModal.findById(course.user);
        return {
          ...course.toObject(),
          creator: creator ? { ...creator.toObject() } : null,
        };
      })
    );

    return res.status(200).json({
      success: true,
      courses: enrichedCourses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while fetching courses",
    });
  }
};

const getVideo = async (req, res) => {
  try {
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Course not found",
      });
    }

    const user = req.user;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Fetch course details
    const course = await postModel.findById({ _id: postId });

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Course not found",
      });
    }

    const creator = await userModal.findById(course.user); // Pass only the ID

    return res.status(200).json({
      success: true,
      course,
      creator: creator || null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while fetching course",
    });
  }
};

const searchCourse = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Course not found",
      });
    }

    const user = req.user;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Fetch course details
    const course = await postModel.find({
      title: { $regex: title, $options: "i" },
    });

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Error in finding course",
      });
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while fetching course",
    });
  }
};

const createFrame = async (req, res) => {
  try {
    const { frameImgUrl, title } = req.body;

    const { _id } = req.user;

    const { success, message, frame } = await makeFrame({ frameImgUrl, title });

    if (!success) {
      return res.status(400).json({
        success: false,
        message: message || "Frame creation error",
      });
    }

    frame.user = _id;
    await frame.save();

    return res.status(200).json({
      success: true,
      frame,
      message: "Frame created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while creating frame",
    });
  }
};

const getFrames = async (req, res) => {
  try {
    const frames = await frameModel.find().populate("user");
    if (!frames) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
    return res.status(200).json({
      success: true,
      frames,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while fetching frames",
    });
  }
};

module.exports = {
  createPost,
  getCourses,
  getVideo,
  searchCourse,
  createFrame,
  getFrames,
};
