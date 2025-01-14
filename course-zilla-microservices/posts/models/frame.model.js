const mongoose = require("mongoose");

const frameSchema = new mongoose.Schema(
  {
    frameImgUrl: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const frameModel = mongoose.model("frame", frameSchema);

module.exports = frameModel;
