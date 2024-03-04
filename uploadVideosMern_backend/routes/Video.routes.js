const express = require("express");
const { isAuth } = require("../utils/middleware");
const {
  createFolder,
  getUserDrive,
  addFile,
  getFolderFiles,
  getUserAllFiles,
} = require("../controllers/VideoController");
const { upload } = require("../config/multerConfig");

const router = express.Router();

router.post("/createFolder", isAuth, createFolder);
router.post("/addFile", isAuth, upload.single("video"), addFile);
router.get("/getUserDrive", isAuth, getUserDrive);
router.get("/getFolderFile/:id", isAuth, getFolderFiles);
router.get("/getUserAllFiles", isAuth, getUserAllFiles);

// router.get("/", isAuth, getAllUsers);
// router.get("/myInfo", isAuth, getloggedInUserInfo);
// router.get("/userInfo/:id", isAuth, getUser);

// router.delete("/deleteUser/:id", isAdmin, deleteUser);

// router.patch("/updateUserInfo", isAuth, upload.single("image"), updateUserInfo);
// router.patch("/changePassword", isAuth, changePassword);

module.exports = router;
