const userModal = require("../../models/user.model");
const { addFollowers } = require("../../services/user/user.service");

const profile = async (req, res) => {
  try {
    const { _id } = req.user;

    if (!_id) {
      return res
        .status(400)
        .json({ success: false, message: "User not found." });
    }
    const user = await userModal.findById(_id);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const pushFollowers = async (req, res) => {
  try {
    const { _id } = req.user;
    const { creatorId } = req.body; // owner of the post from wher eyou follow

    if (!_id) {
      return res
        .status(400)
        .json({ success: false, message: "User not found." });
    }

    const { success, message } = await addFollowers(creatorId, _id);

    if (!success) {
      return res
        .status(400)
        .json({ success: false, message: message || "Somethinng went wrong." });
    }

    const creator = await userModal.findById({ _id: creatorId });
    if (!creator) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, creator });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

module.exports = { profile, pushFollowers };
