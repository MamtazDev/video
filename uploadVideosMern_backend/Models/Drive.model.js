const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    folderSize: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { _id: false }
);

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

const driveSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    folders: {
      type: [folderSchema],
      required: false,
      default: [],
    },
    files: {
      type: [fileSchema],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Drive = mongoose.model("Drive", driveSchema);

module.exports = Drive;
