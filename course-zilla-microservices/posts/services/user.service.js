const userModel = require("../models/user.modal");

const updatePostsInUser = async (userId, postId) => {
  try {
    const user = await userModel.findById({ _id: userId });
    if (!user) return { success: false, message: "User not found" };
    user.posts.push(postId);
    await user.save();
    return { success: true, message: "Post added successfully in user" };
  } catch (error) {
    return { success: false, message: error.message || "Something went wrong" };
  }
};


module.exports = updatePostsInUser;
