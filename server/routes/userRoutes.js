const { register, login, setAvatar, allUsers } = require("../controllers/userControllers");

const router = require("express").Router();
router.post("/register", register);
router.post("/login",login);
router.post("/avatar",setAvatar);
router.post("/allUsers",allUsers);
module.exports = router;
