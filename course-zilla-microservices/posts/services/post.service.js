const postModel = require("../models/post.model");

const create = async (data) => {
  try {
    const post = await postModel.create(data);
    if (!post) return { success: false, message: "Post creation error" };
    return { success: true, post };
  } catch (error) {
    return { success: false, message: error.message || "Post creation error" };
  }
};

module.exports = { create };
