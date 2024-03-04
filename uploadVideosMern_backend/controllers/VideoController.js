const Drive = require("../Models/Drive.model");
const File = require("../Models/File.model");
const Folder = require("../Models/Folder.model");

const createFolder = async (req, res) => {
  try {
    const { title } = req.body;

    const drive = await Drive.findOne({ user: req.user._id });

    if (drive) {
      const newFolder = new Folder({
        title: title,
        parentFolderId: drive?._id,
      });

      const folder = await newFolder.save();

      drive.folders.push({
        _id: folder?._id,
        title: title,
      });

      await drive.save();
    }

    res.send({
      message: "Folder created successfully!",
      success: true,
      data: drive,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};

const addFile = async (req, res) => {
  try {
    const { title, parentFolderId } = req.body;

    const { path, size } = req?.file;

    const drive = parentFolderId
      ? await Folder.findById(parentFolderId)
      : await Drive.findOne({ user: req.user._id });

    console.log(drive, "drive");

    if (drive && parentFolderId) {
      const newFile = new File({
        parentFolderId: parentFolderId,
        title: title,
        user: req.user._id,
        file: path,
        fileSize: size,
      });

      const file = await newFile.save();

      drive.files.push({
        _id: file._id,
        title: file.title,
        file: file.file,
        fileSize: file.fileSize,
      });
      const updateFolder = await drive.save();

      return res.status(200).send({
        success: true,
        message: "File added successfully!",
        data: updateFolder,
      });
    } else if (drive && !parentFolderId) {
      const newFile = new File({
        title: title,
        user: req.user._id,
        file: path,
        fileSize: size,
        parentFolderId: drive?._id,
      });

      const file = await newFile.save();

      drive.files.push({
        _id: file._id,
        title: file.title,
        file: file.file,
        fileSize: file.fileSize,
      });
      const updateFolder = await drive.save();
      return res.status(200).send({
        success: true,
        message: "File added successfully!",
        data: updateFolder,
      });
    } else {
      res.status(401).send({
        success: false,
        message: "Drive not found",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};

const getUserDrive = async (req, res) => {
  try {
    const drive = await Drive.findOne({
      user: req.user._id,
    });
    if (!drive) {
      return res.status(401).send({
        success: false,
        message: "Drive not found",
      });
    } else {
      res.status(200).send(drive);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};

const getFolderFiles = async (req, res) => {
  try {
    const files = await File.find({
      parentFolderId: req.params.id,
    });
    if (!files) {
      return res.status(401).send({
        success: false,
        message: "Folder not found",
      });
    } else {
      res.status(200).send(files);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};
const getUserAllFiles = async (req, res) => {
  try {
    const files = await File.find({
      user: req.user._id,
    });
    if (!files) {
      return res.status(401).send({
        success: false,
        message: "Folder not found",
      });
    } else {
      res.status(200).send(files);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};

module.exports = {
  createFolder,
  addFile,
  getUserDrive,
  getFolderFiles,
  getUserAllFiles,
};
