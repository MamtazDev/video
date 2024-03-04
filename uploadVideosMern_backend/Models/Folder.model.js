const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    _id: {
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
  },
  { _id: false }
);

const folderSchema = new mongoose.Schema(
  {
    parentFolderId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    files: {
      type: [fileSchema],
      required: false,
    },
    folderSize: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Folder = mongoose.model("Folder", folderSchema);

module.exports = Folder;
