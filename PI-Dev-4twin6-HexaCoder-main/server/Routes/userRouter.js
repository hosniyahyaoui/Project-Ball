const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

// REGISTER USER
router.post("/register", userCtrl.register);
//Activation Acccount
router.post("/activation", userCtrl.activateEmail);
//Login user
router.post("/login", userCtrl.login);
//Refresh token
router.post("/refresh_token", userCtrl.getAccessToken);
//Forgot password
router.post("/forgot", userCtrl.forgotPassword);
//Reset password
router.post("/reset", auth, userCtrl.resetPassword);
//Get Users
router.get("/infor", auth, userCtrl.getUserInfor);
//Get all users
router.get("/all_infor", auth, authAdmin, userCtrl.getUsersAllInfor);
//Logout
router.get("/logout", userCtrl.logout);
//Update user
router.patch("/update", auth, userCtrl.updateUser);
// Update role user
router.patch("/update_role/:id", auth, authAdmin, userCtrl.updateUsersRole);
//Delete User
router.delete("/delete/:id", auth, authAdmin, userCtrl.deleteUser);

//Social Login
router.post("/google_login", userCtrl.googleLogin);
router.post("/facebook_login", userCtrl.facebookLogin);

module.exports = router;
