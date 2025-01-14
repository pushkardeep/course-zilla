const postModel = require("../models/post.model");
const frameModel = require("../models/frame.model");

const create = async (data) => {
  try {
    const post = await postModel.create(data);
    if (!post) return { success: false, message: "Post creation error" };
    return { success: true, post };
  } catch (error) {
    return { success: false, message: error.message || "Post creation error" };
  }
};

const makeFrame = async (data) => {
  try {
    const frame = await frameModel.create(data);
    if (!frame) return { success: false, message: "Frame creation error" };
    return { success: true, frame };
  } catch (error) {
    return { success: false, message: error.message || "Frame creation error" };
  }
};

module.exports = { create, makeFrame };
