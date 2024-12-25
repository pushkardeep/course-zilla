const userModel = require("../../models/user.model");

const createUser = async (username, email, password) => {
  try {
    const user = await userModel.create({
      username,
      email,
      password,
    });

    if (!user) return { success: false, message: "User creation error" };
    return { success: true, user };
  } catch (error) {
    return { success: false, message: error.message || "User creation error" };
  }
};

const addFollowers = async (creatorId, followerId) => {
  try {
    // user id , the user we want to follow
    // followe id means our id who is currently logged in

    // Find the user by creatorId
    const user = await userModel.findById(creatorId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Check if the followerId already exists in the followers list
    const isFollower = user.followers.includes(followerId);

    if (isFollower) {
      // If already a follower, remove them
      await userModel.findByIdAndUpdate(
        creatorId,
        { $pull: { followers: followerId } },
        { new: true } // Return the updated document
      );
      return {
        success: true,
      };
    } else {
      // If not a follower, add them
      user.followers.push(followerId);
      await user.save();
      return {
        success: true,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error.message || "Internal server error",
    };
  }
};

module.exports = { createUser, addFollowers };
