const express = require("express");
const { registerUser, loginUser } = require("../controllers/User.controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// router.get("/", isAuth, getAllUsers);
// router.get("/myInfo", isAuth, getloggedInUserInfo);
// router.get("/userInfo/:id", isAuth, getUser);

// router.delete("/deleteUser/:id", isAdmin, deleteUser);

// router.patch("/updateUserInfo", isAuth, upload.single("image"), updateUserInfo);
// router.patch("/changePassword", isAuth, changePassword);

module.exports = router;
