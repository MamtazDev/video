const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    parentFolderId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    file: { type: String, required: true },
    fileSize: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("File", fileSchema);

module.exports = File;
